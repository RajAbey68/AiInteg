# CLAUDE.md — AI Integ Web Project

> Project-level rules. These are additive to and extend the global
> ~/.claude/CLAUDE.md. On conflict, this file wins.

## Project identity

- **Product**: AI Integ
- **Purpose**: Fixed-scope AI software delivery, discovery through production handover
- **Sprint 0 scope**: Marketing site scaffold, Supabase schema, CI pipeline

## Brand constraints (HARD)

| Token | Value |
|-------|-------|
| Primary background | #0A0A0A (near-black) |
| Accent | #00D4B4 (teal) |
| Text | #F0F0F0 |
| Body font | Inter |

Use CSS custom properties — never hardcode hex values in components.

## Language constraints (HARD)

AI Integ is a delivery business, not advisory or consulting.

Banned terms: advisory, counsel, consulting, strategic guidance, strategic advice.
Required language: fixed-scope, deliverables, acceptance criteria, handover, production.

## ASIMOV AI cross-link (MANDATORY)

Every public page must contain a visible cross-link to https://asimov-ai.org
with aria-label "ASIMOV AI — AI governance and risk counsel".

## Development methodology

1. BMAD — Analyst to PM to Architect to PO to Scrum Master to Dev to QA.
2. Four-eyes — every PR requires a second reviewer. Self-review does not count.
3. TDD — tests written before implementation. Coverage >= 80% all thresholds.
4. Biome clean — biome check . must return zero errors.

## Tech stack

React 19 + Vite 6 + TypeScript strict + Tailwind 4 + Biome + Vitest + Playwright + Supabase.
RLS enabled on every table — no exceptions.

## Sprint 0 definition of done

- [ ] All 18 scaffold files present and passing CI
- [ ] biome check . — zero errors
- [ ] tsc --noEmit — zero errors
- [ ] vitest run --coverage — >= 80% all thresholds
- [ ] Playwright suite passing (6 tests)
- [ ] Supabase migration 001_initial_schema.sql applied to project
- [ ] PR reviewed by second reviewer (four-eyes)
