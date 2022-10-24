// Store is a simple web store that pulls products info from a stock gRPC server and pushes updates to a RabbitMQ.
package main

import (
	"log"
	"store/src/services"
)

const (
	productsServerAddr = "127.0.0.1:50051"
	rabbitmqAddr       = "amqp://guest:guest@localhost:5672/"
)

func main() {
	productsService := services.NewProductsService(productsServerAddr)
	productsList := productsService.GetProducts()
	for _, product := range productsList {
		log.Printf("Product %d - %s - %d items remaining\n", product.Id, product.Name, product.Quantity)
	}

	msgBroker := services.NewRabbitMQ(rabbitmqAddr)
	msgBroker.WithdrawProduct()

}
