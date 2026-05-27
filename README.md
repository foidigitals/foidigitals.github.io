# Foi Digitals

Studio site for **Foi Digitals** — an independent atelier crafting mobile apps, mobile games, web products, SaaS, and AI software.

Live at: `https://foidigitals.github.io`

## Structure

```
/
├── index.html              Studio home (portfolio + services)
├── privacy.html            Studio-wide privacy
├── terms.html              Studio-wide terms of use
├── support.html            Studio-wide support / FAQ index
│
├── assets/
│   ├── styles.css          Design system (Cinematic Dark + Aurora)
│   ├── main.js             Vanilla JS (reveals, tilt, menu, etc.)
│   ├── i18n.js             TR/EN translations + runtime
│   └── images/
│
└── apps/calorie-reader-ai/
    ├── index.html          Product page
    ├── privacy.html        App-specific privacy
    ├── terms.html          App-specific terms
    └── support.html        App-specific FAQ
```

Each app ships in its own folder so per-product privacy/terms/support URLs stay clean and stable for the App Store.

## Design

- **Theme**: Cinematic Dark + Aurora — `#08080F` base, aurora gradients (violet → cyan → magenta).
- **Type**: Fraunces (display, variable opsz/SOFT), Onest (body), JetBrains Mono (UI).
- **Signature**: Aurora Compass in the hero, printer's-mark `§` section IDs throughout.
- **Motion**: CSS 3D transforms, IntersectionObserver reveals, mouse-tracked spotlights, animated `@property --angle`.

## Tech

Plain HTML, CSS, vanilla JS. No build step. Bilingual TR / EN with browser auto-detect + manual toggle. Hosted on GitHub Pages.

## Local preview

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Contact

foidigitals@gmail.com
