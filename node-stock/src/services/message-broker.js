const amqp = require("amqplib");

const withdrawalsQueue = "withdrawal";

class MessageBroker {
    ready;
    connection;
    channel;

    constructor() {
        this.ready = amqp
            .connect("amqp://localhost")
            .then(this.handleConnection.bind(this), console.error)
            .then(this.handleChannel.bind(this), console.error);
    }

    handleConnection(connection) {
        this.connection = connection;
        return connection.createChannel();
    }

    handleChannel(channel) {
        this.channel = channel;
        return new Promise((resolve, _) => resolve(true));
    }

    subscribeToWithdrawal(fn) {
        this.ready.then((_) => {
            this.channel.assertQueue(withdrawalsQueue, {
                durable: true,
            });

            const ackFn = this.channel.ack.bind(this.channel);
            this.channel.consume(withdrawalsQueue, fn(ackFn), {
                noAck: false,
            });
            console.log(
                "Waiting for messages in queue '%s'...",
                withdrawalsQueue
            );
        }, console.error);
    }
}

module.exports = new MessageBroker();
