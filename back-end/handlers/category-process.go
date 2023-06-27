package handlers

import (
	"database/sql"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/quyld17/E-Commerce-Website/entities"
)

func GetAllCategories(c *gin.Context, db *sql.DB) {
	categories, err := entities.GetAllCategoryNames(c, db)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, categories)
}