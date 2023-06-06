package handlers

import (
	"database/sql"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func SignUp(c *gin.Context, db *sql.DB) {
    var newUser User

    //Extract data from JSON file received to newUser
    if err := c.ShouldBindJSON(&newUser); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	//Set the signUpDate to Vietnamese Time Zone
	loc, err := time.LoadLocation("Asia/Ho_Chi_Minh")
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load time zone"})
        return
    }
    newUser.Created_at = time.Now().In(loc)

    if err := addUser(newUser, db); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Account already existed! Please try again"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Account created successfully!"})
}

//Add the new user to db
func addUser(newUser User, db *sql.DB) (error) {
	_, err := db.Exec("INSERT INTO user (email, password, created_at) VALUES (?, ?, ?)", newUser.Email, newUser.Password, newUser.Created_at)
	if err != nil {
		return err
	}
	return nil
}