package handlers

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/quyld17/E-Commerce-Website/entities"
)

func CheckOutDetail(c *gin.Context, db *sql.DB) {
	userID, err := GetUserID(c, db)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
	}

	products := []entities.Product{}
	if err := c.ShouldBindJSON(&products); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	retrievedProducts := []entities.Product{}
	for _, product := range products {
		productID := product.ProductID
		product, err := entities.ProductsForCheckout(userID, productID, c, db)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        	return
		}
		retrievedProducts = append(retrievedProducts, product)
	}
	c.JSON(200, retrievedProducts)
}