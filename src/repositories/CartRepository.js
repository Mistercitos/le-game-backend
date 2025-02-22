import CartDao from "../dao/CartDao.js";

class CartRepository {
  async getByUserId(userId) {
    return await CartDao.getByUserId(userId);
  }

  async addProduct(userId, productId, quantity) {
    return await CartDao.addProduct(userId, productId, quantity);
  }

  async removeProduct(userId, productId) {
    return await CartDao.removeProduct(userId, productId);
  }

  async clearCart(userId) {
    return await CartDao.clearCart(userId);
  }
}

export default new CartRepository();
