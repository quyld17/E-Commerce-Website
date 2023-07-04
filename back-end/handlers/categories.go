package handlers

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/quyld17/E-Commerce-Website/entities"
)

func GetAllCategories(c *gin.Context, db *sql.DB) {
	categories, err := entities.GetAllCategoryNames(c, db)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(http.StatusOK, categories)
}