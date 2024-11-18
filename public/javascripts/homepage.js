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

window.onload = () => {
  renderPriceTag();
};
