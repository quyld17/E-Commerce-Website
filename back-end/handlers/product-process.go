package handlers

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/quyld17/E-Commerce-Website/entities"
)

func GetAllProducts(c *gin.Context, db *sql.DB) {
	productDetails, err := entities.GetAllProducts(c, db)
	if err != nil {
		log.Fatal(err)
	}
	
	c.JSON(200, productDetails)
}

func AddProduct(c *gin.Context, db *sql.DB) {
	userID, err := GetUserID(c, db)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
	}

	var product entities.Product
	//Extract data from received JSON file to product
    if err := c.ShouldBindJSON(&product); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	//Call function GetSpecificProductDetail to retrieve product's detail
    if err := entities.AddProductToCart(userID, product.ProductID, product.Quantity, c, db); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add product to cart"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Add product to cart successfully!"})
}

func GetProductDetails(c *gin.Context, db *sql.DB) {
	var product entities.Product

	//Extract data from received JSON file to product_id
    if err := c.ShouldBindJSON(&product); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	productID, err := strconv.Atoi(product.ProductIDString)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ProductID"})
		return
	}

	var productDetail entities.Product
	productImages := []entities.ProductImage{}

	//Call function GetSpecificProductDetail to retrieve product's detail
    if productDetail, productImages, err = entities.GetSpecificProductDetail(productID, c, db); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve product details"})
		return
	}

	productDetails := gin.H{
		"product_detail": productDetail,
		"product_images": productImages,
	}

	c.JSON(200, productDetails)
}