# Src

## Purpose

Contains the production implementation of Explain This Screenshot: command handling, domain rules, storage, reports, and local serving as applicable.

## Contents

- `adapters.mjs` — Collects supported platform observations for Explain This Screenshot and provides explicit safe fallbacks where collection is unavailable.
- `cli.mjs` — Implements Explain This Screenshot's command-line interface and coordinates validation, persistence, report generation, and local serving.
- `demo.mjs` — Builds deterministic synthetic records used to demonstrate Explain This Screenshot without accessing private or live data.
- `model.mjs` — Defines Explain This Screenshot's domain model, validation rules, calculations, and aggregation helpers.
- `render.mjs` — Generates and serves Explain This Screenshot's demonstration report through a deployment-friendly HTTP host.
- `report.mjs` — Builds Explain This Screenshot's self-contained report artifacts and browser-side interactions from validated data.

## Responsibilities

Production behavior belongs here. Generated reports, user data, and repository documentation should remain outside this folder.

## Important Notes

- This folder is part of **Explain This Screenshot** and should be kept consistent with the commands and architecture documented in the root README.
- Paths and file roles listed above reflect the current repository implementation.

