package handlers

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/quyld17/E-Commerce-Website/entities"
)

func GetUserDetails(c *gin.Context, db *sql.DB) {
	userID, err := entities.GetUserID(c, db)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, address, addressDisplay, err := entities.GetUserInfosAndAddress(userID, db)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	response := gin.H{
		"user":            user,
		"address":         address,
		"address_display": addressDisplay,
	}

	c.JSON(http.StatusOK, response)
}
