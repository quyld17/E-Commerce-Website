package main

import (
	"database/sql"
	"log"
	"time"

	"github.com/quyld17/E-Commerce-Website/entities"
	"github.com/quyld17/E-Commerce-Website/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
)

func main() {
    setUpMySQL()
	
    registerAPIHandlers()
}

var db *sql.DB

func setUpMySQL() {
    cfg := mysql.Config{
        User:   "root",
        Passwd: "quyld17",
        Net:    "tcp",
        Addr:   "127.0.0.1:3306",
        DBName: "e-commerce-website",
		AllowNativePasswords: true,
    }

    // Get a database handler.
    var err error
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
        MaxAge:           12 * time.Hour,
    }))
    router.POST("/sign-up", func(c *gin.Context) {
        handlers.SignUp(c, db)
    })
    router.POST("/sign-in", func(c *gin.Context) {
        handlers.SignIn(c, db)
    })
    router.POST("/product-detail", func(c *gin.Context) {
        handlers.GetProductDetails(c, db)
    })
    router.POST("/add-to-cart", func(c *gin.Context) {
        handlers.JWTAuthorize(c)
        handlers.AddProduct(c, db)
    })
    router.GET("/products", func(c *gin.Context) {
        entities.GetAllProducts(c, db)
    })
    router.GET("/categories", func(c *gin.Context) {
        entities.GetAllCategoryNames(c, db)
    })
    
    
    router.Run("localhost:8080")
}
