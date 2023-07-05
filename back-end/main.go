package main

import (
	"database/sql"
	"log"
	"os"
	"time"

	"github.com/quyld17/E-Commerce-Website/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func main() {
    setUpMySQL()
	
    registerAPIHandlers()
}

var db *sql.DB

func setUpMySQL() {
    // Load the environment variables from .env file
    err := godotenv.Load("credentials.env")
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    cfg := mysql.Config{
        User:                   os.Getenv("DB_USER"),
        Passwd:                 os.Getenv("DB_PASSWORD"),
        Net:                    "tcp",
        Addr:                   os.Getenv("DB_HOST") + ":" + os.Getenv("DB_PORT"),
        DBName:                 os.Getenv("DB_NAME"),
        AllowNativePasswords:   true,
    }
    // Get a database handler
    db, err = sql.Open("mysql", cfg.FormatDSN())
    if err != nil {
        log.Fatal(err)
    }
}

func registerAPIHandlers() {
    router := gin.Default()
	router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"*"},
        AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Authorization", "Content-Type"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:           24 * time.Hour,
    }))

    // Authentication
    router.POST("/sign-up", func(c *gin.Context) {
        handlers.SignUp(c, db)
    })
    router.POST("/sign-in", func(c *gin.Context) {
        handlers.SignIn(c, db)
    })

    // Users
    router.GET("/users/user/details", func(c *gin.Context) {
        handlers.JWTAuthorize(c)
        handlers.GetUserDetails(c, db)
    })


    // Products
    router.GET("/products", func(c *gin.Context) {
        handlers.GetAllProducts(c, db)
    })
    router.POST("/products/product/detail", func(c *gin.Context) {
        handlers.GetProductDetails(c, db)
    })

    // Categories
    router.GET("/categories", func(c *gin.Context) {
        handlers.GetAllCategories(c, db)
    })

    // Cart
    router.GET("/cart/products/", func (c *gin.Context) {
        handlers.JWTAuthorize(c)
        handlers.GetAllCartProducts(c, db)
    })
    router.POST("/cart/products/product/add", func(c *gin.Context) {
        handlers.JWTAuthorize(c)
        handlers.AddProductToCart(c, db)
    })
    router.POST("/cart/products/product/quantity/adjust", func(c *gin.Context) {
        handlers.JWTAuthorize(c)
        handlers.AdjustCartProductQuantity(c, db)
    })
    router.POST("/cart/products/selected", func(c *gin.Context) {
        handlers.JWTAuthorize(c)
        handlers.GetCartSelectedProducts(c, db)
    })
    
    
    
    
    router.Run("localhost:8080")
}