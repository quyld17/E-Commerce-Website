package main

import (
	"database/sql"
	"fmt"
	"log"

	"processing/main/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"

	// "github.com/golang-jwt/jwt/v5"
	"cloud.google.com/go/storage"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

var db *sql.DB

func main() {
    // Capture connection properties.
    cfg := mysql.Config{
        User:   "root",
        Passwd: "quyld17",
        Net:    "tcp",
        Addr:   "127.0.0.1:3306",
        DBName: "e-commerce-db",
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

    router.GET("/images", getImageURLs)

    router.Run("localhost:8080")
}

func getImageURLs(c *gin.Context) {
    // Provide your bucket name
    bucketName := "ecw-product-images"

    // Create a new Google Cloud Storage client
    client, err := storage.NewClient(c, option.WithCredentialsFile("D:/Study Time/VS Code/e_commerce-website/back-end/processing/academic-pillar-389913-905084380fd9.json"))
    if err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }

    // Get the bucket handle
    bucket := client.Bucket(bucketName)

    // Query objects in the bucket
    query := &storage.Query{Prefix: "", Delimiter: ""}
    objects := bucket.Objects(c, query)

    // Iterate through the objects and retrieve image URLs
    var imageURLs []string
    for {
        objAttrs, err := objects.Next()
        if err == iterator.Done {
            break
        }
        if err != nil {
            fmt.Println(err)
            c.JSON(500, gin.H{"error": err.Error()})
            return
        }

        // Check if the object is an image
        if objAttrs.ContentType[:6] == "image/" {
            imageURL := "https://storage.googleapis.com/" + bucketName + "/" + objAttrs.Name
            imageURLs = append(imageURLs, imageURL)
        }
    }

    // Return the image URLs as a JSON response
    c.JSON(200, imageURLs)
}