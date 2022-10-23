// Provides some services.
package services

import (
	"context"
	"store/src/proto/products"
	"store/src/utils"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type ProductsService struct {
	addr string
}

func NewProductsService(addr string) *ProductsService {
	return &ProductsService{addr}
}

// GetProducts retrieves the list of products from the gRPC server of the products stock service.
func (p *ProductsService) GetProducts() []*products.Product {
	conn, err := grpc.Dial(p.addr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	utils.ExitOnError(err, "Could not connect to gRPC server")

	defer conn.Close()
	client := products.NewProductServiceClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	res, err := client.List(ctx, &products.Void{})
	utils.ExitOnError(err, "Could not request the list of products")

	return res.GetProducts()
}
