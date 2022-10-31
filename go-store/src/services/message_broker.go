package services

import (
	"context"
	"store/src/proto/products"
	"store/src/utils"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
	"google.golang.org/protobuf/proto"
)

const (
	withdrawalsQueue = "withdrawal"
)

type RabbitMQ struct {
	addr string
}

func NewRabbitMQ(addr string) *RabbitMQ {
	return &RabbitMQ{addr}
}

// Publish sends a message to a RabbitMQ queue.
func (r *RabbitMQ) Publish(queueName string, msg *products.Product) {
	conn, err := amqp.Dial(r.addr)
	utils.ExitOnError(err, "Could not connect to RabbitMQ")

	defer conn.Close()
	ch, err := conn.Channel()
	utils.ExitOnError(err, "Could not open a channel")

	defer ch.Close()
	q, err := ch.QueueDeclare(
		queueName, // name
		true,      // durable
		false,     // delete when unused
		false,     // exclusive
		false,     // no-wait
		nil,       // arguments
	)
	utils.ExitOnError(err, "Could not declare a queue")

	body, err := proto.Marshal(msg)
	utils.ExitOnError(err, "Could not serialize the message")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = ch.PublishWithContext(
		ctx,
		"",     // exchange
		q.Name, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing{
			DeliveryMode: amqp.Persistent,
			ContentType:  "application/x-protobuf",
			Body:         body,
		})
	utils.ExitOnError(err, "Could not publish a message")
}

// WithdrawProduct publishes a product message to the withdrawals queue.
func (r *RabbitMQ) WithdrawProduct() {
	r.Publish(withdrawalsQueue, &products.Product{Id: 6, Name: "Bleh Test321", Quantity: 12345})
}
