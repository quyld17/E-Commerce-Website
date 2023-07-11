package handlers

import (
	"database/sql"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/quyld17/E-Commerce-Website/entities/cart"
	products "github.com/quyld17/E-Commerce-Website/entities/product"
	users "github.com/quyld17/E-Commerce-Website/entities/user"
)

func GetAllCartProducts(c echo.Context, db *sql.DB) error {
	userID, err := users.GetUserID(c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)

	}

	cartProducts, err := cart.GetAllProducts(userID, c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to retrieve cart's data. Please try again")
	}

	return c.JSON(http.StatusOK, cartProducts)
}

func AddProductToCart(c echo.Context, db *sql.DB) error {
	userID, err := users.GetUserID(c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	var product products.Product
	if err := c.Bind(&product); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	if err := cart.AddProduct(userID, product.ProductID, product.Quantity, c, db); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to add product to cart. Please try again")
	}

	return c.JSON(http.StatusOK, "Add product to cart successfully!")
}

func AdjustCartProductQuantity(c echo.Context, db *sql.DB) error {
	userID, err := users.GetUserID(c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	var product products.Product
	if err := c.Bind(&product); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	if err := cart.AdjustProductQuantity(userID, product.ProductID, product.Quantity, c, db); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to adjust product's quantity. Please try again")
	}

	return c.JSON(http.StatusOK, "Adjust product's quantity successfully!")
}

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
