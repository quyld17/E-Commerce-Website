package routers

import (
	"database/sql"

	"github.com/labstack/echo/v4"
	"github.com/quyld17/E-Commerce-Website/handlers"
	"github.com/quyld17/E-Commerce-Website/services/jwt"
)

func RegisterAPIHandlers(router *echo.Echo, db *sql.DB) {
	// Authentication
	router.POST("/sign-up", func(c echo.Context) error {
		return handlers.SignUp(c, db)
	})
	router.POST("/sign-in", func(c echo.Context) error {
		return handlers.SignIn(c, db)
	})

	// Users
	router.GET("/users/me/details", jwt.Authorize(func(c echo.Context) error {
		return handlers.GetUserDetails(c, db)
	}))

	router.GET("/products", func(c echo.Context) error {
		return handlers.GetAllProducts(c, db)
	})
	router.GET("/products/:productID", func(c echo.Context) error {
		productID := c.Param("productID")
		return handlers.GetProductDetails(productID, c, db)
	})

	// Categories
	router.GET("/categories", func(c echo.Context) error {
		return handlers.GetAllCategories(c, db)
	})

	// Cart
	router.GET("/cart", jwt.Authorize(func(c echo.Context) error {
		return handlers.GetAllCartProducts(c, db)
	}))
	router.POST("/cart/product/addition", jwt.Authorize(func(c echo.Context) error {
		return handlers.AddProductToCart(c, db)
	}))
	router.PUT("/cart/product/quantity", jwt.Authorize(func(c echo.Context) error {
		return handlers.AdjustCartProductQuantity(c, db)
	}))
	router.PUT("/cart/selection", jwt.Authorize(func(c echo.Context) error {
		return handlers.SelectCartProducts(c, db)
	}))
	router.PUT("/cart/deselection", jwt.Authorize(func(c echo.Context) error {
		return handlers.DeselectCartProducts(c, db)
	}))
	router.DELETE("/cart/:productID", jwt.Authorize(func(c echo.Context) error {
		productID := c.Param("productID")
		return handlers.DeleteCartProduct(productID, c, db)
	}))
	router.GET("/cart/selected-products", jwt.Authorize(func(c echo.Context) error {
		return handlers.GetCartSelectedProducts(c, db)
	}))
}
