module.exports = class ProductRepositoryMemory {
    products = [
        { id: 1, name: "Smartphone Motorola Moto X4", quantity: 11 },
        { id: 2, name: "Smartphone Samsung Galaxy", quantity: 1 },
        { id: 3, name: "Smartphone Xiaomi Redmi 2", quantity: 1 },
        { id: 4, name: "Microprocessor Pentium II", quantity: 7 },
        { id: 5, name: "Flip-flop Ipanema", quantity: 6 },
        { id: 6, name: "Gift Card Netflix", quantity: 11 },
    ];

    getProducts() {
        return Promise.resolve(this.products);
    }

    getProduct(id) {
        return Promise.resolve(
            this.products.find((product) => product.id === id)
        );
    }

    updateProductQuantity(id, quantity) {
        const product = this.products.find((p) => p.id === id);
        if (product) {
            product.quantity = quantity;
        }
    }

    deleteAllProducts() {
        this.products = [];
    }
};
