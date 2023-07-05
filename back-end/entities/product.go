package entities

import (
	"database/sql"
	"log"

	"github.com/gin-gonic/gin"
)

type Product struct {
	ProductID		int 	`json:"product_id"`
	ProductIDString string 	`json:"product_id_string"`
	CategoryID 		int 	`json:"category_id"`
	ProductName 	string 	`json:"product_name"`
	Price       	int    	`json:"price"`
	InStockQuantity int		`json:"in_stock_quantity"`
	ImageURL    	string 	`json:"image_url"`
	Quantity 		int 	`json:"quantity"`
}

type ProductImage struct {
	ProductID		int 	`json:"product_id"`
	ImageURL    	string 	`json:"image_url"`
	IsThumbnail 	int 	`json:"is_thumbnail"`
}

func GetAllProducts(c *gin.Context, db *sql.DB) ([]Product, error) {
    rows, err := db.Query("SELECT product.product_id, product.product_name, product.price, product.category_id, product_image.image_url FROM product, product_image WHERE product_image.is_thumbnail = 1 AND product.product_id = product_image.product_id;")
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer rows.Close()

    productDetails := []Product{}
	for rows.Next() {
		var product Product
		err := rows.Scan(&product.ProductID, &product.ProductName, &product.Price, &product.CategoryID, &product.ImageURL)
		if err != nil {
			log.Fatal(err)
			return nil, err
		}
		productDetails = append(productDetails, product)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return productDetails, nil
}

func GetSpecificProductDetail(productID int, c *gin.Context, db *sql.DB) (Product, []ProductImage, error) {
	rows, err := db.Query("SELECT product.product_id, product.product_name, product.price, product.in_stock_quantity, product_image.image_url, product_image.is_thumbnail FROM product JOIN product_image ON product.product_id = product_image.product_id WHERE product.product_id = ?;", productID)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	productDetail := Product{}
	productImages := []ProductImage{}

	for rows.Next() {
		var product Product
		var productImage ProductImage

		err := rows.Scan(&product.ProductID, &product.ProductName, &product.Price, &product.InStockQuantity, &productImage.ImageURL, &productImage.IsThumbnail)
		if err != nil {
			log.Fatal(err)
		}

		productDetail = product
		productImages = append(productImages, productImage)
	}

	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	return productDetail, productImages, nil
}