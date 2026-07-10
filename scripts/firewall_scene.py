"""
Scene 3 — The Assurance Firewall
================================

Narrative arc
-------------
Misconception this corrects: "AI Integ just forwards whatever the client
sends us." The reality: every inbound input passes through an Assurance
Firewall — a glowing validation gate — and only emerges as a single,
clean, machine-readable JSON contract.

Visual story:
  LEFT  : three untrusted / messy input nodes floating in
  CENTER: a pulsing, glowing Assurance Firewall gate that scans each node
  RIGHT : a structured, validated JSON document assembling itself line by line

The "aha": heterogeneous, raw inputs are transformed into one sanitized,
schema-locked deliverable. That is the handover-ready artifact.

Brand alignment (see CLAUDE.md):
  background #0A0A0A, accent teal #00D4B4, text #F0F0F0, Inter.
Manim renders best with a monospace face, so we use Menlo and keep the
teal accent + near-black background as the shared visual language.

Run (draft):   manim -ql scripts/firewall_scene.py Scene3AssuranceFirewall
Run (final):   manim -qh scripts/firewall_scene.py Scene3AssuranceFirewall
"""

from manim import *
import numpy as np

# ---- Shared visual language (defined once, per skill convention) ----
BG = "#0A0A0A"          # primary background
TEAL = "#00D4B4"        # accent
TEXT = "#F0F0F0"        # body text
AMBER = "#FFB454"       # untrusted / warning tone
GREEN = "#83C167"       # validated string values
MONO = "Menlo"          # monospace keeps kerning clean in Manim

# ---- Scene geometry ----
LEFT_X = -4.4
GATE_X = 0.0
RIGHT_X = 4.6
NODE_YS = [1.4, 0.0, -1.4]


# ----------------------------------------------------------------------
# Helpers
# ----------------------------------------------------------------------
def glow_gate(color: str):
    """A rounded firewall membrane with an outer pulsing halo.

    The halo throbs via a dt-based updater (continuous time accumulation),
    which is the idiomatic Manim pattern and needs no scene reference.
    """
    gate = RoundedRectangle(width=1.7, height=4.4, corner_radius=0.3)
    gate.set_stroke(color=color, width=4)
    gate.set_fill(color=color, opacity=0.06)

    halo = RoundedRectangle(width=2.1, height=4.9, corner_radius=0.4)
    halo.set_stroke(color=color, width=12, opacity=0.15)
    halo.set_fill(opacity=0)

    phase = {"t": 0.0}
    def pulse(m, dt):
        phase["t"] += dt
        m.set_stroke(opacity=0.10 + 0.12 * (0.5 + 0.5 * np.sin(phase["t"] * 2.0)))

    halo.add_updater(pulse)
    return VGroup(halo, gate)


def input_node(raw_text: str):
    """A small card representing one untrusted inbound input."""
    # Text is light (near-white) so it reads clearly against the faint amber
    # card fill; the amber border/ fill signals "untrusted".
    label = Text(raw_text, font=MONO, font_size=20, color=TEXT)
    card = RoundedRectangle(
        width=max(2.0, label.width + 0.6), height=0.95, corner_radius=0.15
    )
    card.set_stroke(color=AMBER, width=2, opacity=0.7)
    card.set_fill(color=AMBER, opacity=0.08)
    # Place the card at the origin FIRST, then put the label on its center.
    # (Building VGroup(card, label) before moving would make get_center()
    #  return the label's own position, hiding the text behind the card.)
    card.move_to(ORIGIN)
    label.move_to(card.get_center())
    return VGroup(card, label)


def json_line(segments):
    """Build one JSON line from (text, color) tokens, arranged left-to-right."""
    parts = [
        Text(t, font=MONO, font_size=22, color=c) for t, c in segments
    ]
    line = VGroup(*parts)
    line.arrange(RIGHT, buff=0.06)
    return line


# ----------------------------------------------------------------------
# Scene 3
# ----------------------------------------------------------------------
class Scene3AssuranceFirewall(Scene):
    def construct(self):
        self.camera.background_color = BG

        # ---- Title ----
        title = Text(
            "The Assurance Firewall",
            font=MONO,
            font_size=44,
            color=TEAL,
            weight=BOLD,
        ).to_edge(UP, buff=0.5)
        subtitle = Text(
            "raw inputs in  →  validated JSON out",
            font=MONO,
            font_size=22,
            color=TEXT,
            opacity=0.6,
        ).next_to(title, DOWN, buff=0.25)

        self.play(Write(title), run_time=1.5)
        self.play(FadeIn(subtitle, shift=UP * 0.2), run_time=0.6)
        self.wait(0.8)

        # ---- Left column caption ----
        left_cap = Text(
            "untrusted inputs", font=MONO, font_size=20, color=AMBER, opacity=0.8
        ).to_edge(LEFT, buff=0.6).shift(UP * 2.4)
        self.play(FadeIn(left_cap, shift=RIGHT * 0.2), run_time=0.5)

        # ---- Three input nodes (messy / heterogeneous) ----
        raw_inputs = [
            "UsEr_iD: 4471 (raw)",
            "payload: {a:1,?}",
            "src=partner // unverified",
        ]
        nodes = VGroup()
        for text, y in zip(raw_inputs, NODE_YS):
            node = input_node(text)
            node.move_to([LEFT_X, y, 0])
            node.shift(LEFT * 1.0)  # start slightly off-frame
            # Set opacity on the CHILDREN, not the VGroup. Setting it on the
            # VGroup zeroes the inherited child opacity and a parent-level
            # animate back to 1 will NOT restore it.
            for sub in node:
                sub.set_opacity(0)
            nodes.add(node)

        self.play(
            *[node.animate.move_to([LEFT_X, y, 0])
              for node, y in zip(nodes, NODE_YS)],
            *[sub.animate.set_opacity(1) for node in nodes for sub in node],
            run_time=1.2,
        )
        self.add_subcaption("Three untrusted inputs arrive.", duration=2)
        self.wait(0.6)

        # ---- Central glowing gate ----
        gate = glow_gate(TEAL)
        gate.move_to([GATE_X, 0, 0])
        self.play(FadeIn(gate, scale=1.15), run_time=1.0)
        gate_label = Text(
            "ASSURANCE\nFIREWALL",
            font=MONO,
            font_size=20,
            color=TEAL,
            weight=BOLD,
        ).move_to([GATE_X, 0, 0])
        gate_label.set_opacity(0.9)
        self.play(Write(gate_label), run_time=0.8)
        self.wait(0.5)

        # A scan line that sweeps the membrane on each pass.
        scan = Rectangle(width=1.7, height=0.12, color=TEXT)
        scan.set_fill(color=TEXT, opacity=0.9).set_stroke(width=0)
        scan.move_to([GATE_X, 2.2, 0])
        self.add(scan)

        # ---- Right JSON document (assembles one line per pass) ----
        json_lines = VGroup(
            json_line([("{", TEXT)]),
            json_line([('  "user_id": ', TEAL), ("4471", AMBER), (",", TEXT)]),
            json_line([
                ('  "payload": ', TEAL), ("{ ", TEXT),
                ('"a": ', TEAL), ("1", AMBER), (", ", TEXT),
                ('"b": ', TEAL), ("null", AMBER), (" },", TEXT),
            ]),
            json_line([('  "source": ', TEAL), ('"partner-api"', GREEN)]),
            json_line([('  "assurance": ', TEAL), ('"verified"', GREEN)]),
            json_line([("}", TEXT)]),
        )
        json_block = VGroup(*json_lines)
        json_block.arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        json_block.move_to([RIGHT_X, 0.6, 0])

        # Right caption
        right_cap = Text(
            "clean JSON", font=MONO, font_size=20, color=GREEN, opacity=0.85
        ).to_edge(RIGHT, buff=0.6).shift(UP * 2.4)
        self.play(FadeIn(right_cap, shift=LEFT * 0.2), run_time=0.5)

        for line in json_lines:
            line.set_opacity(0)
        self.add(json_block)

        # ---- Flow: each node floats through the gate, JSON line appears ----
        reveal_order = [1, 2, 3]  # value lines revealed as nodes pass
        last_reveal = 5  # index of the closing "}"

        for i, (node, y) in enumerate(zip(nodes, NODE_YS)):
            # 1) drift toward the gate
            self.play(
                node.animate.move_to([GATE_X - 1.0, y, 0]),
                run_time=1.0,
            )
            # 2) gate scan sweep + node passes through
            self.play(
                node.animate.move_to([GATE_X + 1.2, y, 0]),
                scan.animate.move_to([GATE_X, -2.2, 0]),
                run_time=0.9,
            )
            # 3) reveal the matching JSON line as the node exits
            reveal_idx = reveal_order[i]
            self.play(
                json_lines[reveal_idx].animate.set_opacity(1),
                node.animate.set_opacity(0),
                run_time=0.6,
            )
            self.add_subcaption(
                f"Input {i + 1} validated.", duration=1.2
            )
            self.wait(0.3)
            # reset scan to top for next pass
            scan.move_to([GATE_X, 2.2, 0])

        # ---- Final: close the JSON and hold ----
        self.play(json_lines[0].animate.set_opacity(1), run_time=0.4)
        self.play(json_lines[last_reveal].animate.set_opacity(1), run_time=0.4)
        self.add_subcaption(
            "One clean, handover-ready JSON contract.", duration=2.5
        )
        self.wait(1.2)

        # ---- Clean exit ----
        self.play(
            FadeOut(
                VGroup(
                    title, subtitle, left_cap, right_cap, gate_label,
                    nodes, json_block, scan,
                )
            ),
            FadeOut(gate),
            run_time=0.8,
        )
        self.wait(0.3)


if __name__ == "__main__":
    # Allow `python scripts/firewall_scene.py` as a convenience wrapper.
    import subprocess, sys, os
    cmd = [
        "manim", "-ql",
        os.path.abspath(__file__),
        "Scene3AssuranceFirewall",
    ]
    sys.exit(subprocess.call(cmd))
