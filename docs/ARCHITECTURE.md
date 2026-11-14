# Architecture

## Structure

```text
.
├── index.html              Semantic page content and landmarks
├── css/style.css           Design tokens, components, responsive rules
├── js/script.js            Product data and browser interactions
├── assets/images/          Reserved for future local image assets
├── docs/                   Project planning and submission documentation
└── screenshots/            Capture guidance and preview wireframe
```

## Responsibilities
- **HTML:** Page sections, navigation, product mount point, form fields, FAQ disclosures, and accessible labels.
- **CSS:** Visual theme, layout, image treatment, interaction states, responsive breakpoints, and reduced-motion handling.
- **JavaScript:** Product rendering, search/filtering, bag/wishlist state, panel rendering, menu behavior, form feedback, and dynamic year.

## Search and categories
The product catalogue is a small JavaScript array. Search matches lower-cased product names and categories; category buttons set the active category. Both update the same product renderer and provide a no-results state.

## Bag, wishlist, and localStorage
The bag and wishlist store product IDs only. On page load, saved arrays are parsed, validated against the catalogue, and used to render counts/cards. Updates are serialized to versioned localStorage keys. A native dialog provides removable item lists; the bag subtotal is demonstrative only. Storage failures are reported to the console and do not stop browsing.

## Deliberate limitations
No server, checkout, payment, stock management, accounts, delivery service, or real form submission is implemented. Product imagery and fonts load from external hosts; locally hosted assets can be added later.
