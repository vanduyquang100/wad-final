import { renderPriceTag } from "./pricetag.js";
import { modifyQuantity, removeFromCart } from "./cart.js";

const onDocumentDOMLoadEvent = () => {
  renderPriceTag();
};

document.addEventListener("DOMContentLoaded", onDocumentDOMLoadEvent);
