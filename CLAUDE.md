# AiInteg — AI Integrity & ASIMOV-AI

Inherits all rules from `~/.claude/CLAUDE.md`. Project-specific additions below.

## What This Is

AI Integrity is Rajiv's AI governance advisory practice.
ASIMOV-AI is the governance framework embedded within it.

This repo houses:
- Cowork skills (skills/ directory)
- Governance documentation and advisory materials
- ASIMOV-AI framework artifacts

## ASIMOV-AI Framework

ASIMOV-AI stands for:
**A**ccountability · **S**ecurity · **I**ntegrity · **M**onitoring · **O**versight · **V**alidation · **A**udit · **I**mplementation

Core principles:
- Autonomy with accountability — agents act, humans retain override
- Safety before efficiency — audit trail before execution
- Immutable evidence — EvidenceLog is append-only, SHA-256 hash-chained
- Zero fabrication — no hallucinated citations, statistics, or case law
- Four-Eyes Protocol — every significant claim reviewed by ≥2 independent parties
- Kill List — claims that can't be verified are removed, not hedged

## Key Deadline

**EU AI Act — August 2026 enforcement deadline.**
All advisory content must be accurate and defensible as of this date.
No speculative interpretations presented as settled law.

## Skills (skills/ directory)

- **notebooklm** (`skills/notebooklm/SKILL.md`): Google NotebookLM automation — notebooks, sources, podcast/quiz/slide deck generation, Cowork MCP integration.
- **wrapup** (`skills/wrapup/SKILL.md`): End-of-session wrap-up — save memories, write session summary, push to AI Brain notebook. Trigger with `/wrapup`.

## Writing Standards

When producing governance content, advisory documents, or book contributions:
1. Every claim must be traceable to a verifiable source
2. Distinguish clearly between settled law and emerging interpretation
3. UK and EU jurisdictions differ — never conflate them
4. Regulatory citations must include article number, not just name
5. Apply the Kill List — remove unverifiable claims rather than hedge them

## Relationship to Digital Law Firm

AI Integrity / ASIMOV-AI governance framework is embedded in The Digital Law Firm book series.
Rajiv is co-author/ghostwriter (technical implementation chapters).
Book directory: ~/code/The-Digital-Law-Firm/

## At Session Start

1. Read this file
2. Check ~/second-brain/projects/build-infrastructure/README.md if deploying anything
3. Check ~/code/The-Digital-Law-Firm/CLAUDE.md if working on book content
