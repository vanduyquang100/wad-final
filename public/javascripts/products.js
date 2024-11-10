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

const onClickLoadMore = async () => {
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (!hasNextPage || loadMoreBtn.disabled) {
    return;
  }

  loadMoreBtn.disabled = true;
  loadMoreBtn.textContent = "Loading...";

  try {
    const response = await fetch(`/api/products?page=${currentPage + 1}`);
    const products = await response.json();

    currentPage++;
    renderProducts(products.docs);

    if (products.docs.length === 0 || products.hasNextPage === false) {
      hasNextPage = false;
      loadMoreBtn.disabled = false;
      loadMoreBtn.textContent = "No more products";
      return;
    }

    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = "Load More";
  } catch (error) {
    console.error("Error loading more products:", error);
    loadMoreBtn.disabled = false; // Re-enable the button in case of error
    loadMoreBtn.textContent = "Try Again";
  }
};

const renderProducts = (products) => {
  products.forEach((product) => {
    const productItem = document.createElement("a");
    productItem.href = `./product.html?name=${product.productId}`;
    productItem.classList.add(
      "border",
      "rounded-lg",
      "p-5",
      "shadow-sm",
      "text-center"
    );

    productItem.innerHTML = `
      <h3 class="text-lg font-medium mb-2">${product.name}</h3>
      <p class="text-gray-600 mb-2">${product.description}</p>
      <img src="${product.imageUrl || "/images/default-image.png"}" alt="${
      product.name
    }" class="w-32 h-32 mx-auto mb-4">
      <div class="text-xl font-semibold text-gray-800 mb-2">${formatPrice(
        product.price
      )}</div>
    `;

    productList.appendChild(productItem);
  });
};
