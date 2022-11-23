const grpc = require("@grpc/grpc-js");
const { protoPkgDefinition } = require("../proto/products");
const ProductRepositoryMemory = require("../repository/ProductRepositoryMemory");
const ProductController = require("../../controller/ProductController");

const productRepository = new ProductRepositoryMemory();

function listProducts(_, callback) {
    ProductController.listProducts(productRepository).then((products) =>
        callback(null, { products })
    );
}

function initialize() {
    const server = new grpc.Server();
    const gRPCServerBindCallback = (error, port) => {
        if (error) {
            console.error(error);
        } else {
            console.log("gRPC server listening on port %d...", port);
            server.start();
        }
    };

    const productsDefinition = grpc.loadPackageDefinition(protoPkgDefinition);
    server.addService(productsDefinition.ProductService.service, {
        List: listProducts,
    });

    server.bindAsync(
        "0.0.0.0:50051",
        grpc.ServerCredentials.createInsecure(),
        gRPCServerBindCallback
    );
}

module.exports = { initialize };
