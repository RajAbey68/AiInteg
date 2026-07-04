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
    const { full_name, organisation, email, sector, what_to_build, priority_callback, concern } =
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

    // 2. Notify the owner so the one-working-day reply promise is operable.
    // SLA support: set LEAD_NOTIFY_WEBHOOK before launch — without it, leads
    // are only visible in the intake_submissions table.
    const notifyWebhook = Deno.env.get("LEAD_NOTIFY_WEBHOOK");
    if (notifyWebhook) {
      // The ping carries NO personal data (webhook host is a third party):
      // it says a lead exists; the details stay in intake_submissions.
      const notifyHeaders: Record<string, string> = {
        "Content-Type": "text/plain",
        Title: "New lead - reply due within 1 working day", // ASCII only: header values must be ByteStrings
        Priority: "high",
        Tags: "briefcase",
      };
      // NOTE: no X-Email mirror — ntfy.sh rejects anonymous email sending (400)
      // and the rejection drops the entire notification. Email mirroring needs
      // a paid ntfy account or a separate route.
      // Awaited (not fire-and-forget): the edge runtime freezes the instance
      // after the response returns, which silently kills detached fetches.
      // A notify failure still never fails the lead — errors are swallowed here.
      try {
        await fetch(notifyWebhook, {
          method: "POST",
          headers: notifyHeaders,
          body: `New lead received (sector: ${dbData.sector || "unspecified"}). Check intake_submissions — id ${dbData.id}.`,
        });
      } catch (notifyError) {
        console.error(JSON.stringify({ event: "lead_notify_failed", error: String(notifyError) }));
      }
    } else {
      // Structured log line — queryable in Supabase Logs until a webhook is set.
      console.log(JSON.stringify({ event: "lead_received", email_domain: email.split("@")[1] }));
    }

    // 3. Done. Flow is: validate → insert → notify → return success.
    // Roadmap generation was removed from the request path; if wanted later,
    // it moves to an async job.
    return new Response(JSON.stringify({ success: true, submissionId: dbData.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
