module.exports = class GetProducts {
    productRepository;

    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    execute() {
        return this.productRepository.getProducts();
    }
};
