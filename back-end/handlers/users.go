package handlers

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/quyld17/E-Commerce-Website/entities"
)

func GetUserID(c *gin.Context, db *sql.DB) (int, error) {
	email := c.GetString("email")
	// Get the user's ID from the email extracted from JWT
	row := db.QueryRow("SELECT user_id FROM user WHERE email = ?", email)
	var userID int
	if err := row.Scan(&userID); err != nil {
		log.Fatal(err)
		return 0, nil
	}
	return userID, nil
}

func GetUserDetails(c *gin.Context, db *sql.DB) {
	userID, err := GetUserID(c, db)
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
		"user": user,
		"address": address,
		"address_display": addressDisplay,		
	}

	c.JSON(http.StatusOK, response)
}