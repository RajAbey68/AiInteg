import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error("Missing Supabase URL or Service Role Key in environment variables.");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey);

    const payload = await req.json();
    const { full_name, organisation, email, sector, what_to_build, priority_callback, concern, headcount } =
      payload;

    // Honeypot — bots fill the hidden "website" field. Pretend success, store nothing.
    if (payload.website) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Server-side validation — never trust the client.
    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || email.length > 254 || !EMAIL_PATTERN.test(email)) {
      return new Response(JSON.stringify({ success: false, error: "Valid email required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    const freeText = String(what_to_build || concern || "");
    if (freeText.length > 1000) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Project description too long (1000 characters max)",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // 1. Insert into database using Service Role (bypassing RLS)
    const { data: dbData, error: dbError } = await supabaseClient
      .from("intake_submissions")
      .insert({
        full_name: full_name || "Anonymous Prospect",
        organisation: organisation || "",
        email,
        sector: sector || "",
        what_to_build: (freeText || "Not specified").substring(0, 300),
        priority_callback: !!priority_callback,
      })
      .select()
      .single();

    if (dbError) {
      throw dbError;
    }

    // 1b. Notify the owner so the one-working-day reply promise is operable.
    // Deploy dependency: set LEAD_NOTIFY_WEBHOOK in the Edge Function env.
    const notifyWebhook = Deno.env.get("LEAD_NOTIFY_WEBHOOK");
    if (notifyWebhook) {
      // Fire-and-forget — a notification failure must never fail the lead.
      fetch(notifyWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: dbData.full_name,
          organisation: dbData.organisation,
          email: dbData.email,
          sector: dbData.sector,
          created_at: dbData.created_at,
        }),
      }).catch((notifyError) => {
        console.error(JSON.stringify({ event: "lead_notify_failed", error: String(notifyError) }));
      });
    } else {
      // Structured log line — queryable in Supabase Logs until a webhook is set.
      console.log(JSON.stringify({ event: "lead_received", email_domain: email.split("@")[1] }));
    }

    // 2. Call Google AI Studio / Gemini API to generate the roadmap and briefing
    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiKey) {
      throw new Error("Missing GEMINI_API_KEY environment variable.");
    }

    const prompt = `
You are the AI Integrity Senior Architect. Generate a customized 2-page Executive Briefing Document and a 90-Day Implementation Roadmap for:
- Prospect Name: ${full_name || "Prospect"}
- Firm/Organisation: ${organisation || "Regulated Firm"}
- Sector: ${sector || "Regulated Professional Services"}
- Main AI Concern / Focus: ${what_to_build || concern || "Vetting and integrating AI safely"}
- Scaling / Headcount: ${headcount || "Mid-market"}

Ensure compliance with SRA Code of Conduct, FCA SM&CR, and EU AI Act constraints.
The tone must be practical, builder-focused, and direct (no marketing buzzwords like "transformative", "delve", "seamless").
Structure the roadmap using our Crawl-Walk-Run-Fly framework:
- Crawl: Immediate compliance check & sandbox setup.
- Walk: Single-use-case pilot automation.
- Run: Secure API gateways and multi-agent pipeline scaling.
- Fly: Continuous observability & board audit readiness.

Format clearly in Markdown. Start directly with the Briefing.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${errorText}`);
    }

    const resJson = await response.json();
    const generatedContent =
      resJson.candidates?.[0]?.content?.parts?.[0]?.text || "Roadmap generation in progress.";

    // 3. Return results to the client along with the fallback destination
    return new Response(
      JSON.stringify({
        success: true,
        submissionId: dbData.id,
        roadmap: generatedContent,
        skoolRedirect: "https://ai-integ.com",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
