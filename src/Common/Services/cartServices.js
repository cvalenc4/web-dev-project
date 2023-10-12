import Parse from 'parse';
// This is not currently implemented, but we plan to make it a working feature in the future.

// Fetch the current user's active shopping cart
export const fetchActiveCart = async (user) => {
  const ShoppingCart = Parse.Object.extend("ShoppingCart");
  const query = new Parse.Query(ShoppingCart);
  query.equalTo("user", user);
  query.equalTo("status", "Active");
  try {
    return await query.first();
  } catch (error) {
    console.error("Error fetching active cart: ", error);
    throw error;
  }
};

// Add a product to the cart
export const addToCart = async (user, product, quantity) => {
  const CartItem = Parse.Object.extend("CartItem");
  const cartItem = new CartItem();

  cartItem.set("product", product);
  cartItem.set("quantity", quantity);

  const cart = await fetchActiveCart(user);
  cart.add("items", cartItem);

  try {
    await cart.save();
    return cart;
  } catch (error) {
    console.error("Error adding to cart: ", error);
    throw error;
  }
};
