"""
Scene 4 — Engage & The Continuous Thread
=========================================

Narrative arc:
  - Timeline highlights Weeks 11-12 (Handover & Integration) at the top.
  - A horizontal loop spinning continuously representing the automated check thread:
    Code Update ➔ E2E Playwright Check ➔ Production Shield
  - A simulated browser wireframe mockup displaying automated test bots filling forms.

Run (draft):   .venv_manim/bin/manim -ql scripts/engage_scene.py Scene4ContinuousThread
Run (final):   .venv_manim/bin/manim -qh scripts/engage_scene.py Scene4ContinuousThread
"""

from manim import *
import numpy as np

# ---- Shared visual language ----
BG = "#0A0A0A"          # primary background
TEAL = "#00D4B4"        # accent
TEXT = "#F0F0F0"        # body text
AMBER = "#FFB454"       # warning tone
GREEN = "#83C167"       # validated string values
MONO = "Menlo"          # monospace font

class Scene4ContinuousThread(Scene):
    def construct(self):
        self.camera.background_color = BG

        # ---- Title ----
        title = Text(
            "Phase 3: Engage & Handover",
            font=MONO,
            font_size=40,
            color=TEAL,
            weight=BOLD,
        ).to_edge(UP, buff=0.5)
        
        self.play(Write(title), run_time=1.0)

        # ---- Timeline Bar (Top) ----
        timeline_box = Rectangle(width=8.0, height=0.6, color=TEXT, stroke_width=1)
        timeline_box.set_opacity(0.3)
        timeline_box.shift(UP * 1.8)
        
        timeline_fill = Rectangle(width=2.5, height=0.55, color=TEAL, stroke_width=0)
        timeline_fill.set_fill(color=TEAL, opacity=0.15)
        timeline_fill.align_to(timeline_box, RIGHT).shift(LEFT * 0.05 + UP * 1.8)
        
        timeline_label = Text(
            "WEEKS 11-12: INTEGRATION & SHIELDING",
            font=MONO,
            font_size=14,
            color=TEAL,
        ).move_to(timeline_box.get_center())

        self.play(
            Create(timeline_box),
            FadeIn(timeline_fill),
            Write(timeline_label),
            run_time=1.2
        )
        self.add_subcaption("During the final two weeks, we engage and hand over.", duration=3.0)
        self.wait(0.8)

        # ---- Browser Mockup (Right) ----
        browser = RoundedRectangle(width=3.6, height=2.4, corner_radius=0.15)
        browser.set_stroke(color=TEXT, width=1.5, opacity=0.5)
        browser.set_fill(color=BG, opacity=1)
        browser.move_to(np.array([2.3, -0.2, 0]))

        # Browser toolbar
        bar = Line(start=browser.get_left() + UP * 0.85, end=browser.get_right() + UP * 0.85, color=TEXT, stroke_width=1)
        bar.set_opacity(0.3)
        
        dots = VGroup()
        for i in range(3):
            dot = Dot(radius=0.04, color=TEXT)
            dot.move_to(browser.get_corner(UL) + RIGHT * (0.2 + i * 0.15) + DOWN * 0.18)
            dot.set_opacity(0.4)
            dots.add(dot)

        # Form content inside browser mockup
        form_box1 = Rectangle(width=2.8, height=0.25, color=TEXT, stroke_width=1)
        form_box1.set_opacity(0.2)
        form_box1.move_to(browser.get_center() + UP * 0.2)

        form_box2 = Rectangle(width=2.8, height=0.25, color=TEXT, stroke_width=1)
        form_box2.set_opacity(0.2)
        form_box2.move_to(browser.get_center() + DOWN * 0.15)

        form_btn = RoundedRectangle(width=1.0, height=0.25, corner_radius=0.05)
        form_btn.set_stroke(color=TEAL, width=1)
        form_btn.set_fill(color=TEAL, opacity=0.1)
        form_btn.move_to(browser.get_center() + DOWN * 0.6)

        browser_group = VGroup(browser, bar, dots, form_box1, form_box2, form_btn)
        
        self.play(FadeIn(browser_group, shift=LEFT * 0.2), run_time=1.0)
        self.add_subcaption("We deploy to your private secure workspace. You own the code and infra.", duration=4.5)
        self.wait(1.0)

        # ---- The Continuous Thread Loop (Left) ----
        loop_center = np.array([-2.4, -0.2, 0])
        
        circle_loop = Circle(radius=1.2, color=TEAL, stroke_width=2.5)
        circle_loop.set_opacity(0.2)
        circle_loop.move_to(loop_center)
        self.play(Create(circle_loop), run_time=0.8)

        # Loop tags representing checkpoints
        labels_texts = ["1. CODE", "2. PLAYWRIGHT", "3. SHIELD"]
        angles = [90 * DEGREES, -30 * DEGREES, -150 * DEGREES]
        tags = VGroup()
        
        for text, angle in zip(labels_texts, angles):
            pos = loop_center + np.array([1.2 * np.cos(angle), 1.2 * np.sin(angle), 0])
            lbl = Text(text, font=MONO, font_size=10, color=TEXT)
            lbl_bg = RoundedRectangle(width=lbl.width + 0.3, height=lbl.height + 0.2, corner_radius=0.08)
            lbl_bg.set_stroke(color=TEAL, width=1)
            lbl_bg.set_fill(color=BG, opacity=1)
            lbl_bg.move_to(pos)
            lbl.move_to(lbl_bg.get_center())
            tags.add(VGroup(lbl_bg, lbl))

        self.play(
            LaggedStart(*[FadeIn(tag, scale=0.8) for tag in tags], lag_ratio=0.2),
            run_time=1.2
        )
        self.add_subcaption("To ensure stability when external models update, we wrap it in a Continuous Thread.", duration=4.5)
        self.wait(0.8)

        # Draw a simulated pointer cursor bot clicking the browser button
        pointer = Triangle(color=AMBER, stroke_width=2)
        pointer.scale(0.12).rotate(-45 * DEGREES)
        pointer.move_to(browser.get_corner(DR) + DOWN * 0.4)
        
        self.add(pointer)
        
        # Animate click
        self.play(
            pointer.animate.move_to(form_btn.get_center()),
            run_time=1.0
        )
        
        # Simulated click effect
        click_halo = Circle(radius=0.2, color=AMBER, stroke_width=1.5)
        click_halo.move_to(form_btn.get_center())
        self.add(click_halo)
        
        self.play(
            click_halo.animate.scale(2.5).set_opacity(0),
            form_btn.animate.set_fill(color=GREEN, opacity=0.3).set_stroke(color=GREEN),
            run_time=0.6
        )
        self.add_subcaption("Simulated bots test all forms and interfaces, confirming daily compliance.", duration=4.0)
        self.wait(1.5)

        # Clean Exit
        self.play(
            FadeOut(VGroup(title, timeline_box, timeline_fill, timeline_label, browser_group, circle_loop, tags, pointer, click_halo, form_btn)),
            run_time=0.8
        )
        self.wait(0.3)

if __name__ == "__main__":
    import subprocess, sys, os
    cmd = [
        "manim", "-ql",
        os.path.abspath(__file__),
        "Scene4ContinuousThread",
    ]
    sys.exit(subprocess.call(cmd))
