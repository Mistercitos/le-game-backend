import ProductDao from "../dao/ProductDao.js";

class ProductRepository {
  async getAll() {
    return await ProductDao.getAll();
  }

  async getById(id) {
    return await ProductDao.getById(id);
  }

  async create(productData) {
    return await ProductDao.create(productData);
  }

  async update(id, updateData) {
    return await ProductDao.update(id, updateData);
  }

  async delete(id) {
    return await ProductDao.delete(id);
  }
}

export default new ProductRepository();
