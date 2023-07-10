package handlers

import (
	// "database/sql"
	// "net/http"

)

// func GetAllCartProducts(c *gin.Context, db *sql.DB) {
// 	userID, err := entities.GetUserID(c, db)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// cartProducts := []entities.Product{}
// 	cartProducts, err := entities.CartProducts(userID, c, db)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve cart's data. Please try again"})
// 	}

// 	c.JSON(http.StatusOK, cartProducts)
// }

// func AddProductToCart(c *gin.Context, db *sql.DB) {
// 	userID, err := entities.GetUserID(c, db)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	var product entities.Product
// 	if err := c.ShouldBindJSON(&product); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if err := entities.AddProductToCart(userID, product.ProductID, product.Quantity, c, db); err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add product to cart. Please try again"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "Add product to cart successfully!"})
// }

// func AdjustCartProductQuantity(c *gin.Context, db *sql.DB) {
// 	userID, err := entities.GetUserID(c, db)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	var product entities.Product
// 	if err := c.ShouldBindJSON(&product); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if err := entities.ChangeCartProductQuantity(userID, product.ProductID, product.Quantity, c, db); err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to adjust product's quantity. Please try again"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "Adjust product's quantity successfully!"})
// }

// func GetCartSelectedProducts(c *gin.Context, db *sql.DB) {
// 	userID, err := entities.GetUserID(c, db)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	products := []entities.Product{}
// 	if err := c.ShouldBindJSON(&products); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	retrievedProducts := []entities.Product{}
// 	totalPrice := 0
// 	for _, product := range products {
// 		productID := product.ProductID
// 		product, err := entities.ProductsForCheckout(userID, productID, c, db)
// 		if err != nil {
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve selected products. Please try again"})
// 			return
// 		}
// 		retrievedProducts = append(retrievedProducts, product)
// 		totalPrice = totalPrice + (product.Price * product.Quantity)
// 	}
// 	response := gin.H{
// 		"retrievedProducts": retrievedProducts,
// 		"totalPrice":        totalPrice,
// 	}
// 	c.JSON(http.StatusOK, response)
// }