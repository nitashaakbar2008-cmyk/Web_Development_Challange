# Testing record

**Status:** Targeted browser checks were run in the integrated browser at 1440 × 900 desktop, 768 × 1024 tablet, and 390 × 844 mobile viewports. This is not a full cross-browser or assistive-technology audit.

| Check | Status | Notes |
|---|---|---|
| Desktop layout and navigation | Passed (targeted) | Loaded at 1440 × 900; screenshot captured. Anchor navigation used for Shop. |
| Tablet layout | Passed (targeted) | At 768 × 1024, no horizontal overflow detected. |
| Mobile layout | Passed (targeted) | At 390 × 844: mobile menu opened/closed and no horizontal overflow detected; screenshot captured. |
| Navigation and category filtering | Passed (targeted) | Shop link closed the mobile menu; Jewelry card showed two matching products. |
| Search | Passed (targeted) | “linen” returned one product; unmatched term showed the empty state and reset worked. |
| Bag | Passed (targeted) | Add/remove, item count, drawer item, subtotal presentation, and refresh persistence checked. |
| Wishlist | Passed (targeted) | Add/remove, count, and refresh persistence checked. |
| FAQ | Passed (targeted) | Opened consecutive items and confirmed only one remained open. |
| Contact form validation | Passed (targeted) | Valid submission feedback and native rejection of malformed email checked. |
| Newsletter validation | Passed (targeted) | Valid submission feedback and native rejection of malformed email checked. |
| Accessibility | Not run | Semantic labels are present; keyboard-only and reduced-motion behavior still need manual audit. |
| Image loading fallback | Partial | All 17 page images loaded during the online capture; offline/error fallback still needs a check. |

## Known limitations
- External Unsplash photos and Google Fonts require network access.
- The bag, wishlist, search, and category filters are client-side demonstrations.
- Contact and newsletter forms do not send or store submissions.
- No checkout, payment, account, stock, delivery, or real customer review system exists.
