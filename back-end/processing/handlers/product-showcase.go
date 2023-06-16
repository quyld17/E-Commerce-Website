package handlers

import (
	"database/sql"
	"log"

	"github.com/gin-gonic/gin"
)

type ProductDetail struct {
	ProductName string `json:"product_name"`
	Price       int    `json:"price"`
	ImageURL    string `json:"image_url"`
}

func GetAllImageURLs(c *gin.Context, db *sql.DB) {
    rows, err := db.Query("SELECT product.product_name, product.price, product_image.image_url FROM product, product_image WHERE product.product_id = product_image.product_id;")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

    productDetails := []ProductDetail{}
	for rows.Next() {
		var product ProductDetail
		err := rows.Scan(&product.ProductName, &product.Price, &product.ImageURL)
		if err != nil {
			log.Fatal(err)
		}
		productDetails = append(productDetails, product)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, productDetails)
}