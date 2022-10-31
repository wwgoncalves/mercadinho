const amqp = require("amqplib/callback_api");
const path = require("path");
const { promisify } = require("util");
const protobuf = require("protobufjs");

const withdrawalsQueue = "withdrawal";
const connectToRabbitMQ = promisify(amqp.connect);

const handleConnection = (connection) =>
    new Promise((resolve, reject) =>
        connection.createChannel((err, channel) =>
            err ? reject(err) : resolve(channel)
        )
    );

const consumeMessage = (ackFn) => (msg) => {
    const Product = protobuf
        .loadSync(path.resolve(__dirname, "../../proto/products.proto"))
        .lookupType("Product");
    console.log("Received %s.", Product.decode(msg.content).toJSON());
    ackFn(msg);
};

const handleChannel = (channel) => {
    channel.assertQueue(withdrawalsQueue, {
        durable: true,
    });

    console.log("Waiting for messages in %s...", withdrawalsQueue);
    channel.consume(
        withdrawalsQueue,
        consumeMessage(channel.ack.bind(channel)),
        {
            noAck: false,
        }
    );
};

const throwError = (err) => {
    if (err) {
        throw err;
    }
};

function initialize() {
    connectToRabbitMQ("amqp://localhost")
        .then(handleConnection, throwError)
        .then(handleChannel, throwError);
}

module.exports = { initialize };
