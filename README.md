# Speedread

A free, browser-based RSVP reader inspired by one-word speed-reading apps, with its own design. Carmen by Prosper Mérimée is included and ready to read.

## Open the app

**[Open Speedread on GitHub Pages](https://mattkrafft.github.io/SpeedRead/)**

No account or login is required. On iPhone, open the link in Safari, then use **Share → Add to Home Screen**.

## Features

- One, two or three words at a time; 100–1,000 WPM.
- Optional highlighted focal letter and natural punctuation pauses.
- Chapter selection, sentence rewind/advance, position slider and clickable context passage.
- EPUB and TXT import, plus pasted text. No upload or account required by the app.
- Imported books stored in IndexedDB; progress, settings and last opened book stored locally.
- Light/dark themes, responsive layouts and an iPhone-compatible Focus Mode that fills the app without relying on the browser Fullscreen API.
- Home Screen manifest and offline cache after a successful initial visit.
- Reading pauses when the tab is hidden; supported browsers can keep the screen awake.

## Run locally

No build or dependencies are required. Serve the `dist` folder with any static HTTP server, for example:

```sh
python -m http.server 8080 --directory dist
```

Open http://localhost:8080. Do not open index.html as a file: module scripts and book loading need HTTP.

## Scriptable widget

The `scriptable` folder contains a small iPhone widget that shows the current word count, total words and estimated time remaining over the Carmen cover. See [`scriptable/README.md`](scriptable/README.md) for installation instructions. Because Scriptable cannot read Safari's private local storage, use **Update iPhone widget** in SpeedRead to hand the current statistics to the widget.

On iPhone, open the deployed reader in Safari and use Share → Add to Home Screen. EPUB imports require a modern browser with `DecompressionStream('deflate-raw')`. Imported EPUB/TXT files have a 25 MB input limit and EPUBs an 80 MB expanded-size limit. Encrypted/DRM EPUBs, PDFs, scanned documents and web-URL imports are not supported in this version.

## Project layout

- `dist/index.html`, `style.css`: reader and library UI.
- `dist/app.js`: playback, EPUB extraction, persistence and controls.
- `dist/core.js`: tokenization, sentence navigation, timing and ZIP decompression.
- `dist/books/carmen.epub`: original supplied Project Gutenberg edition, including its license.
- `dist/books/carmen.json`: extracted reading text in four chapters, without Gutenberg front/end matter.
- `dist/sw.js`, `manifest.webmanifest`, `icon.svg`: offline cache and install metadata.
- `tests/core.test.js`: reading logic and actual EPUB decompression checks.

Run `npm run check` and `npm test` with Node 22 or later. Browser/iPhone interaction testing is still needed; automated checks do not verify layout or all EPUB publishers.

## Hosting

GitHub Pages publishes `dist/` automatically after changes are merged into `main`. All asset URLs are relative so the reader works from the `/SpeedRead/` repository path. The previous ChatGPT Sites deployment remains available as a secondary mirror.

## Privacy and limits

The app does not send imported books or pasted text to a server. Local storage belongs to a browser and origin and does not sync between devices or hosts. Clearing website data deletes imported books and reading progress. Private browsing and storage restrictions can prevent persistence. The included book is fetched from the same host. No AI summaries, analytics, payments or subscription service are included.

## Book attribution

Carmen — Prosper Mérimée, translated by Lady Mary Loyd. Source: the user-supplied Project Gutenberg eBook 2465, marked public domain in the USA in its EPUB metadata. Keep the original EPUB and its full Project Gutenberg license with distributions. Readers outside the USA should check their local copyright rules. Speedread is not affiliated with ReadMaxx or Project Gutenberg.
