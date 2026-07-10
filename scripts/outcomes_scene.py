"""
Scene 5 — Outcomes & Governance
================================

Narrative arc:
  - 12-week timeline bar collapses into a solid green checkmark.
  - "Wasted Capacity" rolls back to 0, replaced by "Recovered Capacity: 95%" in glowing green.
  - AI Integ and ASIMOV AI logos appear, separated by a vertical conflict wall.

Run (draft):   .venv_manim/bin/manim -ql scripts/outcomes_scene.py Scene5OutcomesGovernance
Run (final):   .venv_manim/bin/manim -qh scripts/outcomes_scene.py Scene5OutcomesGovernance
"""

from manim import *
import numpy as np

# ---- Shared visual language ----
BG = "#0A0A0A"          # primary background
TEAL = "#00D4B4"        # accent
TEXT = "#F0F0F0"        # body text
AMBER = "#FFB454"       # warning tone
GREEN = "#83C167"       # validated string values
RED = "#FF5555"         # critical leak
MONO = "Menlo"          # monospace font

class Scene5OutcomesGovernance(Scene):
    def construct(self):
        self.camera.background_color = BG

        # ---- Title ----
        title = Text(
            "Certainty Delivered",
            font=MONO,
            font_size=40,
            color=TEAL,
            weight=BOLD,
        ).to_edge(UP, buff=0.5)
        
        self.play(Write(title), run_time=1.0)

        # ---- Collapsing Timeline Bar ----
        timeline = Rectangle(width=6.0, height=0.4, color=TEAL, stroke_width=2)
        timeline.set_fill(color=TEAL, opacity=0.1)
        timeline.shift(UP * 1.5)
        
        self.play(Create(timeline), run_time=0.8)
        self.add_subcaption("In twelve weeks, your firm moves from congestion to automated certainty.", duration=3.5)
        self.wait(0.5)

        # Collapse timeline into a single dot and replace with checkmark
        checkmark = Text("✓", font=MONO, font_size=50, color=GREEN)
        checkmark.move_to(timeline.get_center())

        self.play(
            timeline.animate.scale(0.01).set_opacity(0),
            FadeIn(checkmark, scale=0.5),
            run_time=1.0
        )
        self.wait(0.5)

        # ---- Capacity Counter Recovery ----
        counter = Text(
            "Wasted Capacity: 20%",
            font=MONO,
            font_size=24,
            color=RED,
        ).shift(UP * 0.2)
        self.play(FadeIn(counter), run_time=0.5)
        self.wait(0.8)

        # Roll capacity backward and transition to Recovered Capacity
        def roll_counter(obj, val):
            obj.become(
                Text(
                    f"Recovered Margin: {int(val)}%",
                    font=MONO,
                    font_size=24,
                    color=AMBER if val < 70 else GREEN,
                ).shift(UP * 0.2)
            )

        self.play(
            UpdateFromAlphaFunc(counter, lambda m, a: roll_counter(m, a * 95)),
            run_time=1.6
        )
        self.add_subcaption("Your staff are freed from manual entry, recovering lost billable margin.", duration=4.0)
        self.wait(1.0)

        # ---- Conflict Wall & Partners (AI Integ | ASIMOV AI) ----
        # Shift counter up out of the way
        self.play(
            counter.animate.shift(UP * 0.6).scale(0.8),
            checkmark.animate.shift(LEFT * 4.0 + DOWN * 1.0).scale(0.5),
            run_time=0.8
        )

        # Left Logo: AI Integ
        logo_integ_box = RoundedRectangle(width=2.5, height=1.2, corner_radius=0.1)
        logo_integ_box.set_stroke(color=TEAL, width=2)
        logo_integ_box.set_fill(color=TEAL, opacity=0.05)
        logo_integ_box.move_to(np.array([-2.2, -1.4, 0]))
        
        logo_integ_label = Text(
            "AI INTEG",
            font=MONO,
            font_size=18,
            color=TEXT,
            weight=BOLD,
        ).move_to(logo_integ_box.get_center())
        
        logo_integ_sub = Text(
            "SYSTEM BUILD",
            font=MONO,
            font_size=10,
            color=TEXT,
            opacity=0.6,
        ).next_to(logo_integ_box, DOWN, buff=0.1)
        
        integ_group = VGroup(logo_integ_box, logo_integ_label, logo_integ_sub)

        # Right Logo: ASIMOV AI
        logo_asimov_box = RoundedRectangle(width=2.5, height=1.2, corner_radius=0.1)
        logo_asimov_box.set_stroke(color=TEXT, width=1.5, opacity=0.6)
        logo_asimov_box.set_fill(color=TEXT, opacity=0.02)
        logo_asimov_box.move_to(np.array([2.2, -1.4, 0]))
        
        logo_asimov_label = Text(
            "ASIMOV AI",
            font=MONO,
            font_size=18,
            color=TEXT,
            weight=BOLD,
        ).move_to(logo_asimov_box.get_center())
        
        logo_asimov_sub = Text(
            "GOVERNANCE AUDIT",
            font=MONO,
            font_size=10,
            color=TEXT,
            opacity=0.6,
        ).next_to(logo_asimov_box, DOWN, buff=0.1)
        
        asimov_group = VGroup(logo_asimov_box, logo_asimov_label, logo_asimov_sub)

        # Center Wall: Conflict Wall
        wall = Line(start=np.array([0, -0.6, 0]), end=np.array([0, -2.4, 0]), color=RED, stroke_width=3)
        wall_label = Text(
            "CONFLICT\nWALL",
            font=MONO,
            font_size=9,
            color=RED,
            weight=BOLD,
        ).next_to(wall, UP, buff=0.1)

        self.play(
            FadeIn(integ_group, shift=RIGHT * 0.2),
            FadeIn(asimov_group, shift=LEFT * 0.2),
            run_time=1.2
        )
        self.add_subcaption("To keep our work objective, we refer risk governance to ASIMOV AI.", duration=4.0)

        self.play(
            Create(wall),
            FadeIn(wall_label, shift=DOWN * 0.1),
            run_time=1.0
        )
        self.wait(2.0)

        # Clean Exit
        self.play(
            FadeOut(VGroup(title, counter, checkmark, integ_group, asimov_group, wall, wall_label)),
            run_time=0.8
        )
        self.wait(0.3)

if __name__ == "__main__":
    import subprocess, sys, os
    cmd = [
        "manim", "-ql",
        os.path.abspath(__file__),
        "Scene5OutcomesGovernance",
    ]
    sys.exit(subprocess.call(cmd))
