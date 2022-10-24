const amqp = require("amqplib/callback_api");

function initialize() {
    amqp.connect("amqp://localhost", (error1, connection) => {
        if (error1) {
            throw error1;
        }

        connection.createChannel((error2, channel) => {
            if (error2) {
                throw error2;
            }

            const withdrawalsQueue = "withdrawal";
            channel.assertQueue(withdrawalsQueue, {
                durable: false,
            });

            console.log("Waiting for messages in %s...", withdrawalsQueue);
            channel.consume(
                withdrawalsQueue,
                (msg) => {
                    console.log("Received %s.", msg.content.toString());
                },
                {
                    noAck: true,
                }
            );
        });
    });
}

module.exports = { initialize };
