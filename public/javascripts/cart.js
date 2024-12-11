// Cart modification
export const addToCart = async (itemId, quantity) => {
  console.log("Add item to cart API");
  const response = await fetch(`/api/carts/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: itemId,
      quantity,
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
};

export const removeFromCart = async (itemId) => {
  return await modifyQuantity(itemId, 0);
};

export const modifyQuantity = async (itemId, quantity) => {
  console.log("Modifying cart quantity.");
  const response = await fetch(`/api/carts/items`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: itemId,
      quantity,
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to modify products: ${response.statusText}`);
  }
};

export const createOrderFromCurrentCart = async () => {
  const response = await fetch(`/api/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
};
