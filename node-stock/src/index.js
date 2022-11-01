const path = require("path");
const protobuf = require("protobufjs");

const gRPCserver = require("./server");
const msgBroker = require("./services/message-broker");

gRPCserver.initialize();

const consumeWithdrawalMessage = (ackFn) => (msg) => {
    const Product = protobuf
        .loadSync(path.resolve(__dirname, "../../proto/products.proto"))
        .lookupType("Product");
    console.log(
        "Received from `withdrawal`: %s",
        Product.decode(msg.content).toJSON()
    );

    ackFn(msg);
};

msgBroker.subscribeToWithdrawal(consumeWithdrawalMessage);
