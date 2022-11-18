module.exports = class Product {
    id;
    name;
    quantity;

    constructor(id, name, quantity) {
        if (!(id > 0 && name !== "" && quantity >= 0)) {
            throw new Error("Invalid product.");
        }

        this.id = id;
        this.name = name;
        this.quantity = quantity;
    }
};
