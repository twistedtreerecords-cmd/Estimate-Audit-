# Estimate Copilot PWA — working copy

## Included
- `index.html` — working copy of the existing Estimate Copilot prototype, with PWA metadata and 30-day inactivity expiration.
- `manifest.webmanifest` — install metadata.
- `sw.js` — offline app-shell caching.
- `icon.svg` — app icon.

## Important before using
1. Keep your original HTML file and JSON backups unchanged.
2. This is a prototype, not a security-audited production app. Use synthetic/sample data while testing.
3. A PWA service worker and install prompt require HTTPS hosting (or localhost). Opening `index.html` directly as a `file://` file does not activate PWA installation or service-worker offline caching.
4. Browser storage is origin-specific. When hosted at a new address, the app will have a separate IndexedDB database. Use the app's **Import backup JSON** control to import a backup into that new app origin. Verify the restored cases and drafts before relying on them.
5. Cases inactive for 30 days are deleted the next time the app opens. Activity is recorded when a case is opened or edited. This does not guarantee background deletion at the exact 30-day mark if Android suspends the app.
6. Exported JSON backups are separate files and are NOT automatically deleted when a case expires. Delete old backups manually if you want them removed.
7. Verify restore, evidence handling, offline behavior, expiration, and backup/export using sample data before entering real customer, claim, VIN, or repair evidence.

## Android install path
Upload the contents of this folder to an HTTPS static host. Open the hosted `index.html` URL in Chrome on Android, allow it to load once online, then use Chrome's menu to choose **Install app** or **Add to Home screen** if offered. Exact wording varies by Chrome version.
