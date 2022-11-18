const Product = require("../../../../src/core/entity/Product");

test("Should throw an error for an invalid product", function () {
    expect(() => new Product(0, "Product name", 10)).toThrowError();
    expect(() => new Product(1, "", 10)).toThrowError();
    expect(() => new Product(1, "Product name", -1)).toThrowError();
});
