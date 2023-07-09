package handlers

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/quyld17/E-Commerce-Website/entities"
)

func GetAllProducts(c *gin.Context, db *sql.DB) {
	productDetails, err := entities.GetAllProducts(c, db)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to retrieve products at the moment. Please try again"})
		return
	}
	
	c.JSON(http.StatusOK, productDetails)
}

func GetProductDetails(c *gin.Context, db *sql.DB) {
	var product entities.Product
    if err := c.ShouldBindJSON(&product); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	productID, err := strconv.Atoi(product.ProductIDString)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Product ID"})
		return
	}

	var productDetail entities.Product
	productImages := []entities.ProductImage{}
    if productDetail, productImages, err = entities.GetSpecificProductDetail(productID, c, db); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve product's details"})
		return
	}

	productDetails := gin.H{
		"product_detail": productDetail,
		"product_images": productImages,
	}

	c.JSON(http.StatusOK, productDetails)
}