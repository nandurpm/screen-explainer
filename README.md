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

## Live Render Demo

A responsive, synthetic/demo report is available at [https://screen-explainer.onrender.com](https://screen-explainer.onrender.com). The hosted view is read-only and preserves the repository's documented local-first boundaries.

<!-- render-live-url:https://screen-explainer.onrender.com -->

<!-- clear-use-guide -->
## Clear use guide

### Install

Use Node.js 22 or newer, clone this repository, and install its dependencies:

```bash
git clone https://github.com/nandurpm/screen-explainer.git
cd screen-explainer
pnpm install
```

### Open it locally

Start the local web/report server:

```bash
pnpm start
```

Then open the URL printed by the terminal. The production report hosts use http://localhost:4080 unless a different PORT value is set. To choose another port, use PORT=5050 pnpm start on Linux/macOS or set PORT=5050 && pnpm start in Windows Command Prompt.


### Use the hosted version

**Live URL:** [https://screen-explainer.onrender.com](https://screen-explainer.onrender.com)

The hosted version is a browser-friendly report or application view. It runs on Render’s free tier, so the first request after inactivity can take longer while the instance starts.

### Windows and Linux

The same Node.js commands work in Windows PowerShell, Windows Command Prompt, and a Linux terminal. Use the platform-specific port command above only when you need a non-default local port.

### Important scope

This project follows its existing local-first and read-only boundaries. Demo/report content is generated or supplied through the documented local workflow; a hosted page does not provide hidden access to your device, private files, hardware, accounts, or network.

