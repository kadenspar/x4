# Website privacy

The X4 Utilities website is designed to operate entirely in your browser.

- No Google Analytics, Google Tag Manager, telemetry, marketing cookies, advertising pixels, or tracking scripts are included in the application.
- Ship, equipment, ware and station reference data, images, styles, and JavaScript are hosted as part of the same static site; they are not loaded from third-party CDNs at runtime.
- Fleet plans and station layouts are saved to the browser's localStorage under this website's origin. They are not sent to the app developer or hosted in an account. They can be lost if you clear site data, use private browsing, or switch devices or browser profiles.
- The web app has no analytics or personal-data ingestion endpoint.
- Outbound links to GitHub, EGOSOFT and Steam are user-initiated; opening one is subject to the linked site's own policies.
- The website host, DNS provider, and network infrastructure can still process standard access data such as IP address and request metadata. This repo does not itself control those upstream logs. Hosting configuration should disable optional Azure analytics/monitoring independently.
- A Content Security Policy limits application requests to the site's own origin; other defensive browser headers minimize referrer information and browser feature access.

## Verification

The CI workflow runs `scripts/check-web-privacy.py` against source files and the production build output to detect known trackers, Google Analytics integration and external script/style/font/image requests. It also compiles the website. These checks help prevent regressions but cannot guarantee that browser extensions or the hosting infrastructure do not perform their own tracking.

```bash
npm install
npm run build
python3 scripts/check-web-privacy.py
```
