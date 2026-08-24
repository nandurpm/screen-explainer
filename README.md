# Explain This Screenshot

**Explain This Screenshot** is a portable, privacy-conscious local screenshot analysis and annotation workspace. It provides image upload, zoom/pan, manual regions, crop export, labels, notes, browser-local text extraction when supported, structured explanations, annotated-PNG export, and versioned project save/load.

> **Privacy boundary:** The basic workflow runs locally and does not upload images. Local text extraction uses browser support only. External analysis is optional, disabled by default, and cannot run until you provide an endpoint, tick an explicit upload confirmation, and accept a final browser confirmation. The app does not retain remote copies; remote retention is controlled solely by the endpoint you choose.

| Feature | Local behavior |
|---|---|
| Viewer | Uploads a local image into the browser, supports zoom/pan, and normalizes annotations to image coordinates. |
| Regions and crops | Lets you draw a manual region, save its label/notes, export an annotated PNG, or export the selected crop. |
| Local text | Uses `TextDetector` only when the browser supports it; unsupported or failed OCR remains local and fails safely. |
| Project files | Exports/imports a versioned JSON project with image data and annotations. |
| External adapter | Sends image data only after explicit opt-in; no endpoint is preconfigured. |

## Local Linux and Windows use

Install **Node.js 22+** and pnpm. This is a portable local application, not a hosted service or native installer, and has no public website URL.

| Task | Linux / macOS shell | Windows PowerShell or Command Prompt |
|---|---|---|
| Generate synthetic private-safe demo | `./run-local.sh demo --out reports/demo` | `run-local.cmd demo --out reports\demo` |
| Serve local workspace | `./run-local.sh serve reports/demo --port=4073` | `run-local.cmd serve reports\demo --port=4073` |

The report server binds only to `127.0.0.1`; open the printed URL on the same computer. The bundled synthetic dashboard has no private content.

## Validation

```bash
pnpm install
pnpm test
pnpm check
pnpm demo
```

Tests cover annotations, coordinate transforms, project serialization, malformed projects, and local-OCR/external-adapter failure handling.

## License

MIT.
