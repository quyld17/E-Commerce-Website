package routers

import (
	"database/sql"

	"github.com/labstack/echo/v4"
	"github.com/quyld17/E-Commerce-Website/handlers"
	"github.com/quyld17/E-Commerce-Website/middlewares"
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
	router.GET("/users/me", middlewares.JWTAuthorize(func(c echo.Context) error {
		return handlers.GetUserDetails(c, db)
	}))
	router.PUT("/users/me", middlewares.JWTAuthorize(func(c echo.Context) error {
		return handlers.UpdateUserDetails(c, db)
	}))

	// Products
	router.GET("/products", func(c echo.Context) error {
		return handlers.GetProductsByPage(c, db)
	})
	router.GET("/products/:productID", func(c echo.Context) error {
		productID := c.Param("productID")
		return handlers.GetProduct(productID, c, db)
	})

	// Categories
	router.GET("/categories", func(c echo.Context) error {
		return handlers.GetAllCategories(c, db)
	})

	// Cart
	router.GET("/cart-products", middlewares.JWTAuthorize(func(c echo.Context) error {
		selected := c.QueryParam("selected")
		return handlers.GetCartProducts(c, db, selected)
	}))
	router.POST("/cart-products", middlewares.JWTAuthorize(func(c echo.Context) error {
		return handlers.AddProductToCart(c, db)
	}))
	router.PUT("/cart-products", middlewares.JWTAuthorize(func(c echo.Context) error {
		return handlers.UpdateCartProducts(c, db)
	}))
	router.DELETE("/cart-products/:productID", middlewares.JWTAuthorize(func(c echo.Context) error {
		productID := c.Param("productID")
		return handlers.DeleteCartProduct(productID, c, db)
	}))

	// Orders
	router.GET("/orders/me", middlewares.JWTAuthorize(func(c echo.Context) error {
		return handlers.GetOrders(c, db)
	}))
	router.POST("/orders", middlewares.JWTAuthorize(func(c echo.Context) error {
		return handlers.CreateOrder(c, db)
	}))
}
