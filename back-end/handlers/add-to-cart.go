package handlers

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/quyld17/E-Commerce-Website/entities"
)

func AddProduct(c *gin.Context, db *sql.DB) {
	email := c.GetString("email")
	var product entities.Product

	//Extract data from received JSON file to product
    if err := c.ShouldBindJSON(&product); err != nil {
		fmt.Println(err)
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	//Call function GetSpecificProductDetail to retrieve product's detail
    if err := entities.AddProductToCart(email, product.ProductID, product.Quantity, c, db); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add product to cart"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Add product to cart successfully!"})
}