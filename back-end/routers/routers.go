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

	// Products
	router.GET("/products", func(c echo.Context) error {
		return handlers.GetAllProducts(c, db)
	})
	router.POST("/products/product/details", func(c echo.Context) error {
		return handlers.GetProductDetails(c, db)
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
	router.POST("/cart/product/quantity", jwt.Authorize(func(c echo.Context) error {
		return handlers.AdjustCartProductQuantity(c, db)
	}))
	router.POST("/cart/selection", jwt.Authorize(func(c echo.Context) error {
		return handlers.SelectCartProducts(c, db)
	}))
}
