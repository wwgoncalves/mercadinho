const { Product } = require("./proto/products");
const gRPCserver = require("./server");
const msgBroker = require("./services/message-broker");

gRPCserver.initialize();

const consumeWithdrawalMessage = (ackFn) => (msg) => {
    console.log(
        "Received from `withdrawal`: %s",
        Product.decode(msg.content).toJSON()
    );

    ackFn(msg);
};

msgBroker.subscribeToWithdrawal(consumeWithdrawalMessage);
