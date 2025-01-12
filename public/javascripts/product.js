import { addToCart } from "./cart.js";

const formatPrice = (price) => {
  const priceString = price
    .toString()
    .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
  return priceString + " VND";
};

const renderPriceTag = () => {
  const priceTags = document.querySelectorAll(".price-tag");
  priceTags.forEach((priceTag) => {
    const price = parseInt(priceTag.textContent);
    priceTag.textContent = formatPrice(price);
  });
};

window.onload = () => {
  renderPriceTag();
};

document.addEventListener("DOMContentLoaded", () => {
  const decrementBtn = document.getElementById("decrement-btn");
  const incrementBtn = document.getElementById("increment-btn");
  const quantityInput = document.getElementById("quantity-input");
  const addToCartButton = document.getElementById("add-to-cart");

  decrementBtn.addEventListener("click", () => {
    const currentValue = parseInt(quantityInput.value, 10);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
      if (currentValue - 1 === 1) {
        decrementBtn.disabled = true;
      }
    }
  });

  incrementBtn.addEventListener("click", () => {
    const currentValue = parseInt(quantityInput.value, 10);
    quantityInput.value = currentValue + 1;
    if (currentValue + 1 > 1) {
      decrementBtn.disabled = false;
    }
  });

  quantityInput.addEventListener("input", () => {
    let value = parseInt(quantityInput.value, 10);
    if (isNaN(value) || value < 1) {
      value = 1;
    }
    quantityInput.value = value;
    decrementBtn.disabled = value <= 1;
  });

  addToCartButton.addEventListener("click", () => {
    try {
      addToCartButton.textContent = "Adding to cart";
      addToCartButton.disabled = true;
      addToCart(
        window.location.href.split("/").at(-1),
        parseInt(quantityInput.value, 10)
      );
      addToCartButton.textContent = "Successfully added to cart";
    } catch {
      addToCartButton.textContent = "Failed to add to cart";
    } finally {
      setTimeout(() => {
        addToCartButton.textContent = "Add to cart";
        addToCartButton.disabled = false;
      }, 1500);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".carousel-image");
  const navButtons = document.querySelectorAll(".carousel-nav");
  let currentIndex = 0;

  const updateCarousel = (direction) => {
    images[currentIndex].classList.remove("opacity-100");
    images[currentIndex].classList.add("opacity-0");

    if (direction === "next") {
      currentIndex = (currentIndex + 1) % images.length;
    } else if (direction === "prev") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    }

    images[currentIndex].classList.remove("opacity-0");
    images[currentIndex].classList.add("opacity-100");
  };

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.direction;
      updateCarousel(direction);
    });
  });
});
