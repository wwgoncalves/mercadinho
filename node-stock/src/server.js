const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const productsDB = [
    { id: 1, name: "Smartphone Motorola Moto X4", quantity: 11 },
    { id: 2, name: "Smartphone Samsung Galaxy", quantity: 1 },
    { id: 3, name: "Smartphone Xiaomi Redmi 2", quantity: 1 },
    { id: 4, name: "Microprocessor Pentium II", quantity: 7 },
    { id: 5, name: "Flip-flop Ipanema", quantity: 6 },
    { id: 6, name: "Gift Card Netflix", quantity: 11 },
];

const List = (_, callback) => callback(null, { products: productsDB });

function initialize() {
    const protoObject = protoLoader.loadSync(
        path.resolve(__dirname, "../../proto/products.proto")
    );
    const productsDefinition = grpc.loadPackageDefinition(protoObject);

    const gRPCServer = new grpc.Server();
    const gRPCServerBindCallback = (error, port) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`gRPC server listening on port ${port}...`);
            gRPCServer.start();
        }
    };

    gRPCServer.addService(productsDefinition.ProductService.service, { List });
    gRPCServer.bindAsync(
        "0.0.0.0:50051",
        grpc.ServerCredentials.createInsecure(),
        gRPCServerBindCallback
    );
}

module.exports = { initialize };
