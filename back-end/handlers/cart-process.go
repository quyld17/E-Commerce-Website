package handlers

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/quyld17/E-Commerce-Website/entities"
)

func GetCartProducts(c *gin.Context, db *sql.DB) {
	userID, err := GetUserID(c, db)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
	}

	cartProducts := []entities.Product{}
	cartProducts, err = entities.CartProducts(userID, c, db)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, cartProducts)
}

func ChangeCartProductQuantity(c *gin.Context, db *sql.DB) {
	userID, err := GetUserID(c, db)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
	}

	var product entities.Product
	if err := c.ShouldBindJSON(&product); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
	if err := entities.ChangeCartProductQuantity(userID, product.ProductID, product.Quantity, c, db); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Change product's quantity successfully!"})
}