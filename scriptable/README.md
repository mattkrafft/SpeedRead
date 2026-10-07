# SpeedRead Scriptable widget

This is the small square iPhone widget (the size that occupies four Home Screen app positions). It displays the current word position over the book's total words and the estimated reading time remaining, using the book cover as its background.

## Install

1. Install Scriptable from the App Store.
2. In Scriptable, create a script named exactly `SpeedRead Widget`.
3. Paste the contents of `SpeedRead Widget.js` into it and save.
4. Open SpeedRead, then tap **Update iPhone widget** once to send the current book statistics and cover to Scriptable.
5. Long-press the iPhone Home Screen, add a Scriptable widget, choose the small size, and select `SpeedRead Widget` in its settings.

Tap **Update iPhone widget** whenever you want to refresh the saved position immediately. iOS controls the Home Screen refresh schedule, so the displayed value may not change at the exact moment the data is saved. Tapping the widget opens SpeedRead.

## How the cover works

EPUB files commonly identify a cover image in their package manifest. The supplied Carmen EPUB does this with both a `cover-image` manifest property and legacy cover metadata. SpeedRead publishes that image as `dist/books/carmen-cover.jpg`, and the app passes its public URL to Scriptable during an update. Scriptable downloads the cover once and caches it on the phone.

Imported EPUB cover extraction is not yet connected to the widget. Those books still send their reading statistics, and the widget retains the previous cover or uses its fallback background. Automatically sharing an imported local cover would require a small private synchronization service because Scriptable cannot directly read Safari's IndexedDB or local storage.

