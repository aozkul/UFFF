# UFFF — public product website

Live: **https://aozkul.github.io/UFFF/**. Turkish at the root; English at `/en/`; German at `/de/`. Each language has marketing, support and privacy pages.

## October 17, 2026 update

The site previews UFFF 1.1.1: personal photo avatars, 32 bodies, 66 performances including 32 mini movies, voice videos, reaction GIF packs, local duos and the optional GIF keyboard. The App Store publicly serves **1.0**, verified against Apple's lookup endpoint on October 17. The hero explicitly distinguishes the upcoming update from the available version. When 1.1.1 becomes publicly available, update `releaseLabel` and `releaseNote` in all three language entries; do not remove this distinction before checking.

Real app screenshots use the owner's authorized avatar. Captured October 15 for the updated App Store presentation, they show the current creation flows; exact avatar appearance varies by source photo. WebP derivatives contain no source-photo metadata. The social cards come from the same approved presentation. No user recordings, original photos, device backup, test corpus or native app source belongs in this repository.

## Edit and validate

Node.js 22+; no install or dependencies required.

```sh
node scripts/build.mjs
node scripts/check.mjs
node scripts/serve.mjs
```

Local preview: `http://127.0.0.1:8767/UFFF/`.

- `scripts/copy.json`: all TR/EN/DE content, support answers and policy sections.
- `scripts/build.mjs`: static page templates, canonical/alternate links and social metadata.
- `public/assets/style.css`: responsive dark, lime and lavender design.
- `public/assets/01-avatar-*.webp` through `07-duo-*.webp`: optimized real app screens.
- `public/assets/social-*.webp`: localized link-preview artwork.

Commit the generated HTML after rebuilding. Push to `main` triggers **Publish UFFF website**; it validates and deploys **only `public/`** to GitHub Pages. Keep Pages source set to GitHub Actions. Verify the resulting Actions run and the live site after every publish.

## Product and privacy facts

Three successful creations total across formats, then one non-consumable purchase; existing creations stay usable. No subscription. Prices come from the user's App Store region rather than a globally hard-coded amount. Cancelled and failed operations do not use credits. Home avatar personalization does not use a creation credit.

Photo and voice processing run on the iPhone. The optional keyboard copies selected GIFs for the user to paste; it does not send messages automatically or collect typing. Its local shelf holds 24 GIFs. Receiving apps can compress media.

The website contains no runtime JavaScript, cookies, analytics, remote fonts or tracking. GitHub Pages hosting and support-email processing are described separately on the privacy page. All image assets are served from this site. Local-language navigation works without JavaScript.

## App Store URLs

| Language | Marketing | Support | Privacy |
|---|---|---|---|
| Türkçe | https://aozkul.github.io/UFFF/ | https://aozkul.github.io/UFFF/support/ | https://aozkul.github.io/UFFF/privacy/ |
| English | https://aozkul.github.io/UFFF/en/ | https://aozkul.github.io/UFFF/en/support/ | https://aozkul.github.io/UFFF/en/privacy/ |
| Deutsch | https://aozkul.github.io/UFFF/de/ | https://aozkul.github.io/UFFF/de/support/ | https://aozkul.github.io/UFFF/de/privacy/ |

Contact: ali.ozkul@icloud.com. App Store ID: 6810970852 (store listing name: UFFFF; brand: UFFF).
