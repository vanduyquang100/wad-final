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

document
  .getElementById("submit-comment")
  ?.addEventListener("click", async () => {
    const commentTag = document.getElementById("comment-text");
    const commentText = commentTag.value.trim();
    if (!commentText) {
      alert("Please write a comment before submitting.");
      return;
    }

    const productId = commentTag.dataset.productId;

    try {
      const response = await fetch(
        `/api/products/${productId.toString()}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: commentText, rating: 5 }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      // Reload the page to reflect the new comment
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting your comment.");
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  const prevButton = document.getElementById("prev_comment");
  const nextButton = document.getElementById("next_comment");
  const commentTag = document.getElementById("comment-text");
  const productId = commentTag.dataset.productId;
  const commentsContainer = document.getElementById("comments_container"); // Update with your container's ID
  let currentPage = 1;
  const limit = 10; // Number of comments per page

  const fetchComments = async (page) => {
    try {
      const response = await fetch(
        `/api/products/${productId}/comments?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching comments: ${response.statusText}`);
      }

      const data = await response.json();
      updateComments(data.comments);
      updateButtons(data.page, data.totalPages);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const updateComments = (comments) => {
    commentsContainer.innerHTML = comments
      .map(
        (comment) => `
          <div class="border p-4 mb-4 rounded-lg">
            <div class="flex space-x-2 items-center">
              <img src=${comment.user.profilePic} class="w-8 h-8 rounded-full" alt="ava" />
              <p class="comment-user font-semibold text-black">${comment.user.name}</p>
            </div>
            
            <p class="comment-content text-gray-700 mb-2 my-4">${comment.content}</p>
          </div>
        `
      )
      .join("");
  };

  const updateButtons = (page, totalPages) => {
    prevButton.disabled = page <= 1;
    nextButton.disabled = page >= totalPages;
  };

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchComments(currentPage);
    }
  });

  nextButton.addEventListener("click", () => {
    currentPage++;
    fetchComments(currentPage);
  });

  // Initial fetch
  fetchComments(currentPage);
});
