package main

import (
	"database/sql"
	"log"

	"processing/main/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
)

var db *sql.DB

func main() {
    // Capture connection properties.
    cfg := mysql.Config{
        User:   "root",
        Passwd: "quyld17",
        Net:    "tcp",
        Addr:   "127.0.0.1:3306",
        DBName: "ecw",
		AllowNativePasswords: true,
    }

    // Get a database handle.
    var err error
    db, err = sql.Open("mysql", cfg.FormatDSN())
    if err != nil {
        log.Fatal(err)
    }

	router := gin.Default()
	router.Use(cors.Default())
    router.POST("/sign-up", func(c *gin.Context) {
        handlers.SignUp(c, db)
    })
    router.POST("/sign-in", func(c *gin.Context) {
        handlers.SignIn(c, db)
    })

    router.Run("localhost:8080")
}