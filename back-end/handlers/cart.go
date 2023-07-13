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

	cartProducts, totalPrice, err := cart.GetAllProducts(userID, c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}
	// "Failed to retrieve cart's data. Please try again"
	return c.JSON(http.StatusOK, echo.Map{
		"cart_products": cartProducts,
		"total_price":   totalPrice,
	})
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

func SelectCartProducts(c echo.Context, db *sql.DB) error {
	userID, err := users.GetUserID(c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	products := []products.Product{}
	if err := c.Bind(&products); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	for _, product := range products {
		productID := product.ProductID
		if err := cart.SelectCartProducts(userID, productID, c, db); err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err)
		}
	}

	return c.JSON(http.StatusOK, "Select product successfully!")
}
