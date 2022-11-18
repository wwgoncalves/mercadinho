const gRPCserver = require("./infra/grpc/server");
const msgConsumer = require("./infra/rabbitmq/consumer");

gRPCserver.initialize();
msgConsumer.initialize();
