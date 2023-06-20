package handlers

import (
	"database/sql"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/quyld17/E-Commerce-Website/entities"
)

func SignUp(c *gin.Context, db *sql.DB) {
    var newUser entities.User

    //Extract data from received JSON file to newUser
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

    if err := entities.RegisterNewUser(newUser, db); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Account already existed! Please try again"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Account created successfully!"})
}
