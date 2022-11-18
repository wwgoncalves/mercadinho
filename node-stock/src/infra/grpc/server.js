const grpc = require("@grpc/grpc-js");
const ProductController = require("../../controller/ProductController");
const { protoPkgDefinition } = require("../proto/products");

function listProducts(_, callback) {
    ProductController.listProducts().then((products) =>
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
