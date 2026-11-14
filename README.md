# AURELLE & CO.

AURELLE & CO. is a polished, editorial-style storefront concept for a premium fashion and lifestyle brand. The responsive landing page showcases a small curated assortment and demonstrates common shopping interactions entirely in the browser.

## Features

- Responsive navigation, editorial hero, category cards, featured collection, story, sample reviews, FAQs, contact form, and footer.
- Search by product name or category, plus category-card filters.
- Demo shopping bag and wishlist with add/remove controls, live counts, and browser `localStorage` persistence.
- Accessible native FAQ disclosures, form validation, visible focus states, and reduced-motion support.
- No payment flow, account system, backend, or real message/newsletter submission.

## Technologies

- Semantic HTML, CSS, and vanilla JavaScript
- Google Fonts (Playfair Display and DM Sans), with system-font fallbacks
- Unsplash-hosted editorial images

## Project structure

```text
.
├── index.html
├── css/style.css
├── js/script.js
├── docs/
├── assets/images/       (available for local assets; remote demo images are used)
└── screenshots/
```

## Run in VS Code

1. Open this folder in VS Code.
2. Open `index.html` in a browser, or use the Live Server extension and select **Open with Live Server**.
3. An internet connection is needed for the hosted images and web fonts. The page structure and local interactions work without a backend.

## Test the features

- Search a product or category, e.g. “linen” or “jewelry”; try a term with no matches.
- Choose any category card to filter the product edit.
- Add and remove products from the wishlist and bag; refresh to confirm counts and selections persist.
- Open the mobile menu at a narrow viewport and follow a navigation link.
- Expand the FAQ items, and submit invalid then valid contact/newsletter forms.
- Use keyboard Tab/Enter, inspect visible focus, and enable reduced motion in the operating system/browser.
- Record only tests actually performed in [docs/testing.md](docs/testing.md).

## Screenshots and wireframe

Actual browser captures are included: [desktop screenshot](screenshots/desktop.png) and [mobile screenshot](screenshots/mobile.png). See [screenshots/README.md](screenshots/README.md) for the low-fi layout preview and capture details.

## Deploy with GitHub Pages

1. Create a GitHub repository and push this project to its default branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select the default branch and `/ (root)`, then save.
4. Wait for the Pages deployment to finish. Use the URL GitHub actually reports in the Pages settings; no live URL is claimed in this project.

## GitHub repository setup

From a terminal opened in this folder:

```bash
git init
git add .
git commit -m "Build Aurelle & Co. landing page"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the example remote with your repository's actual URL. Review the files before publishing and do not add credentials or private data.
