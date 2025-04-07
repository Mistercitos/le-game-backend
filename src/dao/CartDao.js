import Cart from "../models/Cart.js";

class CartDao {
  async getByUserId(userId) {
    return await Cart.findOne({ user: userId }).populate("products.product");
  }

  async create(userId) {
    return await Cart.create({ user: userId, products: [] });
  }

  async addProduct(userId, productId, quantity = 1) {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await this.create(userId);
    }

    const existingProduct = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await cart.save();
  }

  async removeProduct(userId, productId) {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) return null;

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );

    return await cart.save();
  }

  async clearCart(userId) {
    return await Cart.findOneAndUpdate(
      { user: userId },
      { products: [] },
      { new: true }
    );
  }
}

export default new CartDao();
