const productList = document.getElementById("product-list");
let currentPage = 1;
let hasNextPage = true;

const formatPrice = (price) => {
  const priceString = price
    .toString()
    .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
  return priceString + " VND";
};

const renderPriceTag = () => {
  priceTags = document.querySelectorAll(".price-tag");
  priceTags.forEach((priceTag) => {
    const price = parseInt(priceTag.textContent);
    priceTag.textContent = formatPrice(price);
  });
};
const renderCategoryButtons = () => {
  const categoryButtons = document.querySelectorAll(".category-button");
  const params = new URLSearchParams(window.location.search);
  const categories = params.getAll("category");

  categoryButtons.forEach((categoryButton) => {
    const category = categoryButton.dataset.category;
    if (!categories.includes(category)) {
      categoryButton.classList.remove("border-[1px]");
    } else {
      categoryButton.classList.add("border-[1px]");
    }
  });
};

const onClickLoadMore = async () => {
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (!hasNextPage || loadMoreBtn.disabled) {
    return;
  }

  loadMoreBtn.disabled = true;
  loadMoreBtn.textContent = "Loading...";

  try {
    const products = await fetchProducts(currentPage + 1);
    currentPage++;
    renderProducts(products.docs);
    hasNextPage = products.hasNextPage;

    updateLoadMoreButton(hasNextPage);
  } catch (error) {
    console.error("Error loading more products:", error);
    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = "Try Again";
  }
};

const renderProducts = (products) => {
  products.forEach((product) => {
    const productItem = document.createElement("a");
    productItem.href = `./products/${product._id}`;
    productItem.classList.add(
      "border",
      "rounded-lg",
      "p-5",
      "shadow-sm",
      "text-center"
    );

    productItem.innerHTML = `
      <h3 class="text-lg font-semibold mb-1">${product.name}</h3>
      <p class="text-[0.7rem] rounded-full px-2 py-1 bg-green-100 w-fit mx-auto">${
        product.category
      }</p>
      <img src="${
        product.imageUrl || "/images/default-image.png"
      }" alt="Product Image" class="w-32 h-32 mx-auto mb-4">
      ${
        product.promotePrice
          ? `<div class="price-tag text-sm text-gray-500 line-through">${formatPrice(
              product.price || 0
            )}</div>`
          : ""
      }
      <div class="price-tag text-xl font-semibold text-gray-800 mb-2">${formatPrice(
        product.promotePrice ?? (product.price || 0)
      )}</div>
      <p class="text-gray-600 mb-2 text-sm pt-4 border-t-[1px] border-gray-200 mt-2">${
        product.description
      }</p>
    `;

    // div(class="price-tag text-sm text-gray-500 line-through")=product.price

    productList.appendChild(productItem);
  });
};

const handleCategoryClick = (event) => {
  const button = event.target;
  const category = button.dataset.category;
  filterProductsByCategory(category);
};

const filterProductsByCategory = async (category) => {
  // Update the query parameter in the URL without reloading the page
  const params = new URLSearchParams(window.location.search);
  if (params.getAll("category").includes(category)) {
    params.delete("category", category);
  } else {
    params.append("category", category);
  }
  params.set("page", 1); // Reset to the first page
  history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);

  await fetchPage();
};

const fetchProducts = async (page = 1) => {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("category")) {
    params.delete("category");
  }

  params.set("page", page);

  const response = await fetch(`/api/products?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return response.json();
};

const updateLoadMoreButton = (hasNextPage) => {
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (!hasNextPage) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "No more products";
  } else {
    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = "Load More";
  }
};

const fetchPage = async () => {
  currentPage = 1;
  hasNextPage = true;
  productList.innerHTML = "";

  try {
    const products = await fetchProducts(currentPage);
    renderProducts(products.docs);
    renderCategoryButtons();
    hasNextPage = products.hasNextPage;

    updateLoadMoreButton(hasNextPage);
  } catch (error) {
    console.error("Error filtering products:", error);
  }
};

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const performSearch = async (query) => {
  const params = new URLSearchParams(window.location.search);
  if (query && query != "") {
    params.set("name", query);
  } else {
    params.delete("name");
  }
  history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
  await fetchPage();
};

const debouncedSearch = debounce(performSearch, 300);
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", (event) => {
  debouncedSearch(event.target.value);
});

document.getElementById("price-filter").onchange = async (event) => {
  const params = new URLSearchParams(window.location.search);
  const optionValue = event.target.value;
  const minPriceFilterName = "minPrice";
  const maxPriceFilterName = "maxPrice";

  switch (optionValue) {
    case "$":
      params.delete(minPriceFilterName);
      params.set(maxPriceFilterName, 50000000);
      break;
    case "$$":
      params.set(minPriceFilterName, 50000000);
      params.set(maxPriceFilterName, 200000000);
      break;
    case "$$$":
      params.set(minPriceFilterName, 200000000);
      params.delete(maxPriceFilterName);
      break;
    default:
      params.delete(minPriceFilterName);
      params.delete(maxPriceFilterName);
  }
  history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
  await fetchPage();
};

window.onload = () => {
  renderPriceTag();
  renderCategoryButtons();
};
