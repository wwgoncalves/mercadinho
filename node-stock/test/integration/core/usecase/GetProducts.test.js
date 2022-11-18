const GetProducts = require("../../../../src/core/usecase/GetProducts");
const ProductRepositoryMemory = require("../../../../src/infra/repository/ProductRepositoryMemory");

test("Should return all products previously registered", async () => {
    const productRepositoryMemory = new ProductRepositoryMemory();
    const getProducts = new GetProducts(productRepositoryMemory);
    const products = await getProducts.execute();
    expect(products.length).toBe(6);
});

test("Should return no products", async () => {
    const productRepositoryMemory = new ProductRepositoryMemory();
    const getProducts = new GetProducts(productRepositoryMemory);
    productRepositoryMemory.deleteAllProducts();
    const products = await getProducts.execute();
    expect(products.length).toBe(0);
});
