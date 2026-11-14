const products = [
  { id: "solstice-hoops", name: "Solstice Hoops", category: "Jewelry", price: 12500, tag: "Bestseller", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=82", alt: "Sculptural gold hoop earrings" },
  { id: "the-atelier-tote", name: "The Atelier Tote", category: "Bags", price: 28900, tag: "Everyday icon", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=82", alt: "Structured leather handbag" },
  { id: "amber-no-04", name: "Amber No. 04", category: "Perfumes", price: 16500, tag: "New", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=82", alt: "Amber-toned fragrance bottle" },
  { id: "the-linen-shirt", name: "The Linen Shirt", category: "Clothing", price: 18900, tag: "Natural linen", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=82", alt: "Soft neutral linen shirt" },
  { id: "little-moment-watch", name: "Little Moment Watch", category: "Watches", price: 32500, tag: "A forever piece", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=82", alt: "Classic minimal wristwatch" },
  { id: "muse-slingbacks", name: "Muse Slingbacks", category: "Shoes", price: 24900, tag: "Editor's pick", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=82", alt: "Elegant pointed slingback shoes" },
  { id: "heirloom-cuff", name: "Heirloom Cuff", category: "Jewelry", price: 14700, tag: "Hand-finished", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=82", alt: "Fine gold cuff bracelet" },
  { id: "soft-structure-blazer", name: "Soft Structure Blazer", category: "Clothing", price: 34900, tag: "Considered cut", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=82", alt: "Tailored neutral blazer" }
];

const storageKeys = { cart: "aurelle-cart-v1", wishlist: "aurelle-wishlist-v1" };
const state = {
  cart: readSaved(storageKeys.cart),
  wishlist: readSaved(storageKeys.wishlist),
  query: "",
  category: ""
};
const productGrid = document.querySelector("#product-grid");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#product-search");
const searchFeedback = document.querySelector("#search-feedback");
const dialog = document.querySelector("#utility-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogContent = document.querySelector("#dialog-content");

document.addEventListener("error", event => {
  if (event.target instanceof HTMLImageElement) event.target.classList.add("image-failed");
}, true);

function readSaved(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(saved) ? saved.filter(id => products.some(product => product.id === id)) : [];
  } catch (error) {
    console.warn(`Could not read saved shopping data for ${key}.`, error);
    return [];
  }
}

function saveState(key, value) {
  try {
    localStorage.setItem(storageKeys[key], JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save ${key} data in this browser.`, error);
  }
}

function formatPrice(price) {
  return `PKR ${new Intl.NumberFormat("en-PK").format(price)}`;
}

function visibleProducts() {
  const query = state.query.trim().toLocaleLowerCase();
  return products.filter(product => {
    const matchesCategory = !state.category || product.category === state.category;
    const matchesQuery = !query || `${product.name} ${product.category}`.toLocaleLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
}

function renderProducts() {
  const items = visibleProducts();
  productGrid.innerHTML = items.map(product => {
    const wished = state.wishlist.includes(product.id);
    const inCart = state.cart.includes(product.id);
    return `<article class="product-card">
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.alt}" loading="lazy">
        <span class="product-tag">${product.tag}</span>
        <button class="product-wish" type="button" data-wishlist="${product.id}" aria-label="${wished ? "Remove" : "Add"} ${product.name} ${wished ? "from" : "to"} wishlist" aria-pressed="${wished}">${wished ? "♥" : "♡"}</button>
      </div>
      <div class="product-info"><h3 class="product-name">${product.name}</h3><p class="product-category">${product.category}</p><span class="product-price">${formatPrice(product.price)}</span></div>
      <button class="add-cart" type="button" data-cart="${product.id}" aria-pressed="${inCart}">${inCart ? "Added to bag ✓" : "Add to bag"}</button>
    </article>`;
  }).join("");
  emptyState.hidden = items.length > 0;
  productGrid.hidden = items.length === 0;
  searchFeedback.textContent = state.query || state.category
    ? `${items.length} ${items.length === 1 ? "piece" : "pieces"} found${state.category ? ` in ${state.category}` : ""}.`
    : "";
}

function updateCounts() {
  document.querySelector("#cart-count").textContent = state.cart.length;
  document.querySelector("#wishlist-count").textContent = state.wishlist.length;
  document.querySelector('[data-open-panel="cart"]').setAttribute("aria-label", `Open shopping bag, ${state.cart.length} ${state.cart.length === 1 ? "item" : "items"}`);
  document.querySelector('[data-open-panel="wishlist"]').setAttribute("aria-label", `Open wishlist, ${state.wishlist.length} ${state.wishlist.length === 1 ? "item" : "items"}`);
}

function renderPanel(type) {
  const ids = state[type];
  const items = ids.map(id => products.find(product => product.id === id)).filter(Boolean);
  dialogTitle.textContent = type === "cart" ? "Your bag" : "Your wishlist";
  if (!items.length) {
    dialogContent.innerHTML = `<p class="dialog-empty">Your ${type === "cart" ? "bag is" : "wishlist is"} waiting for a little something lovely.</p>`;
  } else {
    dialogContent.innerHTML = items.map(product => `<article class="drawer-item">
      <img src="${product.image}" alt="" loading="lazy">
      <div><h3>${product.name}</h3><p>${product.category}</p><p>${formatPrice(product.price)}</p></div>
      <button class="drawer-remove" type="button" data-remove="${type}:${product.id}">Remove</button>
    </article>`).join("");
    if (type === "cart") {
      const total = items.reduce((sum, product) => sum + product.price, 0);
      dialogContent.insertAdjacentHTML("beforeend", `<div class="drawer-total"><span>Demo subtotal</span><span>${formatPrice(total)}</span></div>`);
    }
  }
}

function openPanel(type) {
  renderPanel(type);
  if (!dialog.open) dialog.showModal();
}

function setCategory(category) {
  state.category = category;
  state.query = "";
  searchInput.value = "";
  renderProducts();
  document.querySelector("#best-sellers").scrollIntoView({ behavior: "smooth" });
}

document.querySelector("#search-form").addEventListener("submit", event => {
  event.preventDefault();
  state.query = searchInput.value;
  state.category = "";
  renderProducts();
  document.querySelector("#best-sellers").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", () => {
  state.query = searchInput.value;
  state.category = "";
  renderProducts();
});

document.addEventListener("click", event => {
  const target = event.target.closest("button, a");
  if (!target) return;
  if (target.matches("[data-wishlist]")) {
    const { wishlist: list } = state;
    const id = target.dataset.wishlist;
    state.wishlist = list.includes(id) ? list.filter(item => item !== id) : [...list, id];
    saveState("wishlist", state.wishlist);
    updateCounts();
    renderProducts();
    if (dialog.open && dialogTitle.textContent === "Your wishlist") renderPanel("wishlist");
  }
  if (target.matches("[data-cart]")) {
    const id = target.dataset.cart;
    state.cart = state.cart.includes(id) ? state.cart.filter(item => item !== id) : [...state.cart, id];
    saveState("cart", state.cart);
    updateCounts();
    renderProducts();
    if (dialog.open && dialogTitle.textContent === "Your bag") renderPanel("cart");
  }
  if (target.matches("[data-open-panel]")) openPanel(target.dataset.openPanel);
  if (target.matches("[data-remove]")) {
    const [type, id] = target.dataset.remove.split(":");
    state[type] = state[type].filter(item => item !== id);
    saveState(type, state[type]);
    updateCounts();
    renderProducts();
    renderPanel(type);
  }
  if (target.matches("[data-category]")) setCategory(target.dataset.category);
  if (target.matches("[data-footer-category]")) {
    event.preventDefault();
    setCategory(target.dataset.footerCategory);
  }
  if (target.matches("[data-clear-search]")) {
    state.query = "";
    state.category = "";
    searchInput.value = "";
    renderProducts();
  }
  if (target.matches("[data-scroll-search]")) {
    document.querySelector(".search-section").scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => searchInput.focus(), 350);
  }
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

document.querySelector(".faq-list").addEventListener("toggle", event => {
  if (event.target instanceof HTMLDetailsElement && event.target.open) {
    document.querySelectorAll(".faq-list details[open]").forEach(item => {
      if (item !== event.target) item.open = false;
    });
  }
}, true);

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !expanded);
});
navigation.addEventListener("click", event => {
  if (event.target.closest("a")) {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }
});

document.querySelector("#contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const feedback = document.querySelector("#contact-feedback");
  if (!form.reportValidity()) return;
  feedback.textContent = "Your note looks ready. This demo does not send messages to a server.";
  form.reset();
});

document.querySelector("#newsletter-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const feedback = document.querySelector("#newsletter-feedback");
  if (!form.reportValidity()) return;
  feedback.textContent = "Thank you — your email is valid. This demo does not store or send subscriptions.";
  form.reset();
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
renderProducts();
updateCounts();
