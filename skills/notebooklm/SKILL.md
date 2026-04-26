# NotebookLM Skill

Full programmatic access to Google NotebookLM — create notebooks, add sources, generate podcasts, quizzes, slide decks, reports, flashcards, and infographics.

## Prerequisites

- Google account connected via `GOOGLE_OAUTH`
- NotebookLM CLI installed and authenticated

## Quick Reference

| Task | Command |
|------|---------|
| List notebooks | `notebooklm list` |
| Create notebook | `notebooklm create "Title"` |
| Add URL | `notebooklm source add "https://..."` |
| Chat | `notebooklm ask "question"` |
| Generate podcast | `notebooklm generate audio` |
| Generate quiz | `notebooklm generate quiz` |

## Setup

1. Install: `pip install "notebooklm-py[browser]"`
2. Authenticate: `notebooklm login`
