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
	router.GET("/users/user/details", jwt.Authorize(func(c echo.Context) error {
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
	// router.GET("/cart/products/", func(c echo.Context) error {
	// 	handlers.JWTAuthorize(c)
	// 	handlers.GetAllCartProducts(c, db)
	// })
	// router.POST("/cart/products/product/add", func(c echo.Context) error {
	// 	handlers.JWTAuthorize(c)
	// 	handlers.AddProductToCart(c, db)
	// })
	// router.POST("/cart/products/product/quantity/adjust", func(c echo.Context) error {
	// 	handlers.JWTAuthorize(c)
	// 	handlers.AdjustCartProductQuantity(c, db)
	// })
	// router.POST("/cart/products/selected", func(c echo.Context) error {
	// 	handlers.JWTAuthorize(c)
	// 	handlers.GetCartSelectedProducts(c, db)
	// })
}
