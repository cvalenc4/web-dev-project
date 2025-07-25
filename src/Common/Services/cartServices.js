import Parse from 'parse';

// Fetch the current user's active shopping cart
export const fetchActiveCart = (user) => {
    const ShoppingCart = Parse.Object.extend("ShoppingCart");
    const query = new Parse.Query(ShoppingCart);
    query.equalTo("user", user);
    query.equalTo("status", "Active");
    query.include("items.product");
    
    return query.first().then(cart => {
      if (cart) {
        return cart;
      } else {
        const newCart = new ShoppingCart();
        newCart.set("user", user);
        newCart.set("status", "Active");
        newCart.set("items", []);
        return newCart.save().then(savedCart => {
          return savedCart;
        })
        .catch(error => {
          console.error("Error creating new cart:", error);
          throw error;
        });
      }
    }).catch(error => {
      console.error("Error fetching active cart: ", error);
      throw error;
    });
};
  
// Add a product to the cart
export const addToCart = (user, product, quantity) => {
  return fetchActiveCart(user).then(cart => {
    let items = cart.get("items") || [];
    let itemExists = false;

    // Update quantity if item exists
    items = items.map(item => {
        if (item.get("product").id === product.id) {
            itemExists = true;
            const updatedQuantity = item.get("quantity") + quantity;
            item.set("quantity", updatedQuantity);
        }
        return item;
    });  

    // Add new item if it doesn't exist
    if (!itemExists) {
      console.log('here')
        const Product = Parse.Object.extend("Products");
        const query = new Parse.Query(Product);
        query.equalTo("objectId", product.objectID);
        return query.first().then((productResult) => {
          if (!productResult) {
            throw new Error('Product not found');
          }
          const CartItem = Parse.Object.extend("CartItem");
          const cartItem = new CartItem();
          cartItem.set("product", productResult); // Set the product pointer
          cartItem.set("quantity", quantity);
          cartItem.set("cart", cart); // Associate cartItem with the ShoppingCart
          items.push(cartItem);

          cart.set("items", items);
          return cart.save();
        });
    } else {
        cart.set("items", items);
        return cart.save();
    }
  }).then(savedCart => {
      console.log("Item added to cart: ", savedCart);
      return savedCart;
  }).catch(error => {
      console.error("Error adding to cart: ", error);
      throw error;
  });
};

// Remove a product from the cart
export const removeFromCart = (user, itemId) => {
  return fetchActiveCart(user).then(cart => {
    if (!cart) {
      throw new Error("No active cart found");
    }

    let items = cart.get("items") || [];
    let itemToRemove = items.find(item => item.id === itemId);

    if (!itemToRemove) {
      throw new Error("Item not found in cart");
    }

    // Remove the item from the cart's items array
    items = items.filter(item => item.id !== itemId);
    cart.set("items", items);

    // Save the updated cart and delete the CartItem from the database
    return cart.save().then(() => {
      return itemToRemove.destroy().then(() => {
        console.log("Item removed from cart and deleted from database");
        return cart; // Return the updated cart
      });
    });
  }).catch(error => {
    console.error("Error removing item from cart: ", error);
    throw error;
  });
};

// Increase the quantity of a product in the cart
export const increaseQuantity = (user, itemId) => {
  return updateCartItemQuantity(user, itemId, 1);
};

// Decrease the quantity of a product in the cart
export const decreaseQuantity = (user, itemId) => {
  return updateCartItemQuantity(user, itemId, -1);
};

export const updateCartItemQuantity = (user, itemId, change) => {
  return fetchActiveCart(user).then(cart => {
    let items = cart.get("items") || [];
    let itemToUpdate = items.find(item => item.id === itemId);

    if (!itemToUpdate) {
      throw new Error("Item not found in cart");
    }

    let newQuantity = itemToUpdate.get("quantity") + change;
    if (newQuantity <= 0) {
      // Prevent decreasing quantity below 1
      return cart; 
    } else {
      // Update the quantity and save the cart
      itemToUpdate.set("quantity", newQuantity);
      return cart.save().then(savedCart => {
        console.log("Cart updated: ", savedCart);
        return savedCart;
      });
    }
  }).catch(error => {
    console.error("Error updating item quantity: ", error);
    throw error;
  });
};