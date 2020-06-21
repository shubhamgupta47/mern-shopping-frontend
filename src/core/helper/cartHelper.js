export const addItemToCart = (item, next) => {
  let cart = [];
  if (window) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (window) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeItemFromCart = (productId) => {
  let cart = [];
  if (window) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1);
      }
      return "";
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const emptyCart = (next) => {
  if (window) {
    localStorage.removeItem("cart");
    next();
  }
};
