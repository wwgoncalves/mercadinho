// A simple web store that pulls products info from a gRPC server and pushes updates to a RabbitMQ
package main

import (
	"context"
	"log"
	"store/src/products"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

const (
	serverAddr = "127.0.0.1:50051"
)

func getProducts() []*products.Product {
	conn, err := grpc.Dial(serverAddr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("Could not connect to gRPC server: %v", err)
	}

	defer conn.Close()
	client := products.NewProductServiceClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	res, err := client.List(ctx, &products.Void{})
	if err != nil {
		log.Fatalf("Could not request the list of products: %v", err)
	}

	return res.GetProducts()
}

func main() {
	productsList := getProducts()
	for _, product := range productsList {
		log.Printf("Product %d - %s - %d items remaining\n", product.Id, product.Name, product.Quantity)
	}
}
