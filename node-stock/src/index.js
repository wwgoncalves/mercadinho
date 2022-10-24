const gRPCserver = require("./server");
const msgBrokerConsumer = require("./consumer");

gRPCserver.initialize();
msgBrokerConsumer.initialize();
