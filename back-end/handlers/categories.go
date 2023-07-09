package handlers

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/quyld17/E-Commerce-Website/entities"
)

func GetAllCategories(c *gin.Context, db *sql.DB) {
	categories, err := entities.GetAllCategoryNames(c, db)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to retrieve categories at the moment. Please try again"})
		return
	}

	c.JSON(http.StatusOK, categories)
}
