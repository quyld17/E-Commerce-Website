package handlers

import (
	"database/sql"
	"log"

	"github.com/gin-gonic/gin"
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