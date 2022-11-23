const GetProducts = require("../core/usecase/GetProducts");

module.exports = class ProductController {
    static async listProducts(productRepository) {
        const getProducts = new GetProducts(productRepository);
        const products = await getProducts.execute();
        return products;
    }
};
