const GetProducts = require("../core/usecase/GetProducts");
const ProductRepositoryMemory = require("../infra/repository/ProductRepositoryMemory");

module.exports = class ProductController {
    static async listProducts() {
        const productRepositoryMemory = new ProductRepositoryMemory();
        const getProducts = new GetProducts(productRepositoryMemory);
        const products = await getProducts.execute();
        return products;
    }
};
