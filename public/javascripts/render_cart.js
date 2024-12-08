import { formatPrice, renderPriceTag } from "./pricetag.js";
import { modifyQuantity, removeFromCart } from "./cart.js";

const onDocumentDOMLoadEvent = () => {
  const updateTotalPrice = () => {
    let totalPrice = 0;
    document.querySelectorAll(".total-price").forEach((priceTag) => {
      totalPrice += parseFloat(priceTag.dataset.total_price) || 0;
    });
    document.querySelector(".total-price-tag").textContent =
      formatPrice(totalPrice);
  };

  const updateItemTotalPrice = (productId, unitPrice, quantity) => {
    const totalPriceElement = document.querySelector(
      `.total-price[data-product_id="${productId}"]`
    );
    if (totalPriceElement) {
      const totalPrice = (unitPrice * quantity).toFixed(2);
      totalPriceElement.dataset.total_price = totalPrice;
      totalPriceElement.textContent = formatPrice(totalPrice);
    }
  };

  document.querySelectorAll(".quantity-input").forEach((input) => {
    const productId = input.dataset.product_id;
    console.log("Finding price tag with productId ", productId);
    const unitPrice = parseFloat(
      document.querySelector(`.total-price[data-product_id="${productId}"]`)
        .dataset.price
    );

    const decrementButton = input.previousElementSibling;
    const incrementButton = input.nextElementSibling;

    const updateButtonsState = () => {
      decrementButton.disabled = input.value <= 1;
    };

    input.addEventListener("change", () => {
      const quantity = Math.max(1, parseInt(input.value) || 1);
      input.value = quantity;
      updateItemTotalPrice(productId, unitPrice, quantity);
      updateTotalPrice();
      updateButtonsState();
    });

    decrementButton.addEventListener("click", async () => {
      let quantity = Math.max(1, parseInt(input.value) - 1);
      input.value = quantity;
      updateItemTotalPrice(productId, unitPrice, quantity);
      updateTotalPrice();
      updateButtonsState();
      await modifyQuantity(productId, quantity);
    });

    incrementButton.addEventListener("click", async () => {
      const quantity = parseInt(input.value) + 1;
      input.value = quantity;
      updateItemTotalPrice(productId, unitPrice, quantity);
      updateTotalPrice();
      updateButtonsState();
      await modifyQuantity(productId, quantity);
    });

    updateButtonsState(); // Initialize button states
  });

  document.querySelectorAll(".remove-item-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const itemRow = button.closest(".item-row");
      itemRow.remove();
      updateTotalPrice();
      await removeFromCart(button.dataset.product_id);
    });
  });

  renderPriceTag();
};

document.addEventListener("DOMContentLoaded", onDocumentDOMLoadEvent);
