"""
Scene 2 — Phase 1: Discovery
=============================

Narrative arc:
  - Timeline highlights Weeks 1-2 (Discovery) at the top.
  - A dynamic tree graph grows representing the firm's folder & CRM data supply chain mapping.
  - An "Acceptance Specification" document card generates and is stamped.

Run (draft):   .venv_manim/bin/manim -ql scripts/discovery_scene.py Scene2DiscoveryPhase
Run (final):   .venv_manim/bin/manim -qh scripts/discovery_scene.py Scene2DiscoveryPhase
"""

from manim import *
import numpy as np

# ---- Shared visual language ----
BG = "#0A0A0A"          # primary background
TEAL = "#00D4B4"        # accent
TEXT = "#F0F0F0"        # body text
AMBER = "#FFB454"       # warning tone
MONO = "Menlo"          # monospace font

class Scene2DiscoveryPhase(Scene):
    def construct(self):
        self.camera.background_color = BG

        # ---- Title ----
        title = Text(
            "Phase 1: Discovery",
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
        timeline_fill.align_to(timeline_box, LEFT).shift(RIGHT * 0.05 + UP * 1.8)
        
        timeline_label = Text(
            "WEEKS 1-2: DISCOVERY SPECIFICATION",
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
        self.add_subcaption("Our engagement starts with a fixed, two-week Discovery phase.", duration=3.0)
        self.wait(0.8)

        # ---- Dynamic Tree Graph (Data Supply Chain) ----
        # Base node
        root = Circle(radius=0.25, color=TEAL, fill_color=BG, fill_opacity=1)
        root.move_to(np.array([-2.5, -0.2, 0]))
        root_label = Text("Firm\nCore", font=MONO, font_size=12, color=TEXT).next_to(root, DOWN, buff=0.15)

        # Branches
        branch_targets = [
            np.array([-0.5, 0.8, 0]),   # Folders
            np.array([-0.5, -0.2, 0]),  # Documents
            np.array([-0.5, -1.2, 0]),  # CRM/APIs
        ]
        
        branches = VGroup()
        end_nodes = VGroup()
        labels = VGroup()
        label_texts = ["File Repos", "Client Records", "CRM APIs"]

        for target, label_text in zip(branch_targets, label_texts):
            line = Line(start=root.get_right(), end=target, color=TEXT, stroke_width=2)
            line.set_opacity(0.4)
            branches.add(line)
            
            node = Circle(radius=0.18, color=TEXT, fill_color=BG, fill_opacity=1)
            node.move_to(target)
            end_nodes.add(node)
            
            lbl = Text(label_text, font=MONO, font_size=12, color=TEXT).next_to(node, RIGHT, buff=0.15)
            lbl.set_opacity(0.7)
            labels.add(lbl)

        self.play(
            Create(root),
            FadeIn(root_label),
            run_time=0.8
        )
        self.add_subcaption("We map your firm's data supply chain to locate where regulatory risks lie.", duration=4.0)

        # Grow branches
        self.play(
            LaggedStart(*[Create(line) for line in branches], lag_ratio=0.15),
            LaggedStart(*[FadeIn(node) for node in end_nodes], lag_ratio=0.15),
            LaggedStart(*[FadeIn(lbl, shift=RIGHT * 0.1) for lbl in labels], lag_ratio=0.15),
            run_time=1.5
        )
        self.wait(1.0)

        # ---- The Specification Card ----
        # Shift data tree to the left slightly
        tree_group = VGroup(root, root_label, branches, end_nodes, labels)
        self.play(
            tree_group.animate.shift(LEFT * 1.0),
            run_time=0.8
        )

        spec_card = RoundedRectangle(width=3.0, height=2.0, corner_radius=0.15)
        spec_card.set_stroke(color=TEAL, width=2)
        spec_card.set_fill(color=TEAL, opacity=0.06)
        spec_card.move_to(np.array([2.4, -0.2, 0]))

        spec_title = Text(
            "ACCEPTANCE\nSPECIFICATION",
            font=MONO,
            font_size=15,
            color=TEXT,
            weight=BOLD,
        ).move_to(spec_card.get_center() + UP * 0.35)

        spec_body = Text(
            "• Locked Data Schema\n• Verification Rules\n• Fixed Acceptance Criteria",
            font=MONO,
            font_size=10,
            color=TEXT,
            opacity=0.8,
        ).move_to(spec_card.get_center() + DOWN * 0.3)

        spec_group = VGroup(spec_card, spec_title, spec_body)
        
        # Grow spec from core node
        arrow = Arrow(start=np.array([0.8, -0.2, 0]), end=spec_card.get_left(), color=TEAL, buff=0.1)
        
        self.play(
            Create(arrow),
            FadeIn(spec_group, shift=RIGHT * 0.25),
            run_time=1.2
        )
        self.add_subcaption("We write a concrete specification mapping exactly what the system does.", duration=4.0)
        self.wait(1.0)

        # Stamp the document card
        stamp_box = Rectangle(width=1.6, height=0.45, color=TEAL, stroke_width=2)
        stamp_box.set_fill(color=BG, opacity=1)
        stamp_box.move_to(spec_card.get_center() + DOWN * 0.5)
        
        stamp_label = Text(
            "DONE SPECIFIED",
            font=MONO,
            font_size=11,
            color=TEAL,
            weight=BOLD,
        ).move_to(stamp_box.get_center())
        
        stamp = VGroup(stamp_box, stamp_label)
        stamp.rotate(15 * DEGREES)
        stamp.scale(1.1)

        self.play(
            FadeIn(stamp, scale=0.5, shift=DOWN * 0.1),
            run_time=0.4
        )
        self.add_subcaption("You get absolute clarity on what 'done' means before the build starts.", duration=3.5)
        self.wait(1.5)

        # Clean Exit
        self.play(
            FadeOut(VGroup(title, timeline_box, timeline_fill, timeline_label, tree_group, arrow, spec_group, stamp)),
            run_time=0.8
        )
        self.wait(0.3)

if __name__ == "__main__":
    import subprocess, sys, os
    cmd = [
        "manim", "-ql",
        os.path.abspath(__file__),
        "Scene2DiscoveryPhase",
    ]
    sys.exit(subprocess.call(cmd))
