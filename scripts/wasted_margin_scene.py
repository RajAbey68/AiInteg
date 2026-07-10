"""
Scene 1 — The Wasted Margin
===========================

Narrative arc:
  - 50 dots representing a firm's staff on a grid.
  - 10 dots (20%) fade to amber/red and leak particles.
  - A capacity counter "Wasted Capacity: 20%" appears.
  - A policy binder icon "Compliance Guidelines" surrounded by a maze appears.

Run (draft):   .venv_manim/bin/manim -ql scripts/wasted_margin_scene.py Scene1WastedMargin
Run (final):   .venv_manim/bin/manim -qh scripts/wasted_margin_scene.py Scene1WastedMargin
"""

from manim import *
import numpy as np

# ---- Shared visual language ----
BG = "#0A0A0A"          # primary background
TEAL = "#00D4B4"        # accent
TEXT = "#F0F0F0"        # body text
AMBER = "#FFB454"       # warning tone
RED = "#FF5555"         # critical leak
MONO = "Menlo"          # monospace font

class Scene1WastedMargin(Scene):
    def construct(self):
        self.camera.background_color = BG

        # ---- Title ----
        title = Text(
            "The Wasted Margin",
            font=MONO,
            font_size=40,
            color=TEAL,
            weight=BOLD,
        ).to_edge(UP, buff=0.5)
        
        subtitle = Text(
            "Staff Capacity Leakage & Compliance Mazes",
            font=MONO,
            font_size=20,
            color=TEXT,
            opacity=0.6,
        ).next_to(title, DOWN, buff=0.2)

        self.play(Write(title), run_time=1.2)
        self.play(FadeIn(subtitle, shift=UP * 0.1), run_time=0.5)
        self.wait(0.5)

        # ---- Staff Grid (5 rows, 10 columns) ----
        dots = VGroup()
        rows, cols = 5, 10
        start_x, start_y = -3.5, 1.2
        spacing_x, spacing_y = 0.7, 0.65

        for r in range(rows):
            for c in range(cols):
                dot = Dot(radius=0.1, color=TEXT)
                dot.move_to(np.array([start_x + c * spacing_x, start_y - r * spacing_y, 0]))
                dots.add(dot)

        # Draw grid
        self.play(
            LaggedStart(*[FadeIn(dot, scale=0.5) for dot in dots], lag_ratio=0.03),
            run_time=1.2
        )
        self.add_subcaption("In a professional services firm, time is your raw material.", duration=3.0)
        self.wait(1.0)

        # Select 10 random dots (20% of 50) to fade and turn red
        leak_indices = [3, 7, 12, 18, 24, 29, 33, 38, 42, 47]
        leak_dots = VGroup(*[dots[i] for i in leak_indices])

        # Counter text
        counter = Text(
            "Wasted Capacity: 0%",
            font=MONO,
            font_size=24,
            color=TEXT,
        ).to_edge(LEFT, buff=0.8).shift(DOWN * 1.5)
        self.play(FadeIn(counter), run_time=0.5)

        # Animate capacity counter and dots leaking
        def update_counter(obj, val):
            obj.become(
                Text(
                    f"Wasted Capacity: {int(val)}%",
                    font=MONO,
                    font_size=24,
                    color=AMBER if val < 20 else RED,
                ).to_edge(LEFT, buff=0.8).shift(DOWN * 1.5)
            )

        # Animate dots turning red/amber and shrinking/fading
        self.play(
            *[dot.animate.set_color(RED).scale(0.8) for dot in leak_dots],
            UpdateFromAlphaFunc(counter, lambda m, a: update_counter(m, a * 20)),
            run_time=1.5
        )
        
        # Leak particles downward
        particles = VGroup()
        for dot in leak_dots:
            for _ in range(3):
                p = Dot(radius=0.04, color=AMBER).set_opacity(0.8)
                p.move_to(dot.get_center())
                particles.add(p)
                
        self.add(particles)
        self.play(
            *[p.animate.shift(DOWN * 1.2 + np.array([np.random.uniform(-0.2, 0.2), 0, 0])).set_opacity(0)
              for p in particles],
            *[dot.animate.set_opacity(0.3) for dot in leak_dots],
            run_time=1.2
        )
        self.add_subcaption("Yet, fee-earners spend up to 20% of their week on manual triage.", duration=3.5)
        self.wait(0.8)

        # ---- The Policy Maze ----
        # Move dots to the left side to make space for the binder/maze
        self.play(
            dots.animate.shift(LEFT * 1.8),
            counter.animate.shift(LEFT * 0.4),
            run_time=1.0
        )

        # Draw a binder box
        binder = RoundedRectangle(width=2.2, height=1.6, corner_radius=0.15)
        binder.set_stroke(color=AMBER, width=2)
        binder.set_fill(color=AMBER, opacity=0.05)
        binder.move_to(np.array([2.5, 0, 0]))

        binder_label = Text(
            "COMPLIANCE\nPOLICY",
            font=MONO,
            font_size=16,
            color=TEXT,
            weight=BOLD,
        ).move_to(binder.get_center())
        
        policy_group = VGroup(binder, binder_label)

        # Draw a simple maze of boxes around the binder
        maze = VGroup()
        maze_coords = [
            [2.5, 1.2, 0], [2.5, -1.2, 0],
            [1.0, 0, 0], [4.0, 0, 0],
            [1.2, 0.8, 0], [3.8, -0.8, 0]
        ]
        for coord in maze_coords:
            wall = Line(start=coord - np.array([0.3, 0, 0]), end=coord + np.array([0.3, 0, 0]), color=TEXT, stroke_width=2)
            wall.set_opacity(0.4)
            maze.add(wall)

        self.play(
            FadeIn(policy_group, shift=UP * 0.2),
            LaggedStart(*[Create(wall) for wall in maze], lag_ratio=0.1),
            run_time=1.5
        )
        self.add_subcaption("Consultants hand you 100-page slide decks, leaving you with the risk.", duration=4.0)
        self.wait(1.5)

        # Fade out everything cleanly
        self.play(
            FadeOut(VGroup(title, subtitle, dots, counter, policy_group, maze)),
            run_time=0.8
        )
        self.wait(0.3)

if __name__ == "__main__":
    import subprocess, sys, os
    cmd = [
        "manim", "-ql",
        os.path.abspath(__file__),
        "Scene1WastedMargin",
    ]
    sys.exit(subprocess.call(cmd))
