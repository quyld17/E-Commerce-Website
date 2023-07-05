package handlers

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/quyld17/E-Commerce-Website/entities"
	"github.com/quyld17/E-Commerce-Website/services"
)

func SignIn(c *gin.Context, db *sql.DB) {
    var account entities.User

    //Extract data from received JSON file to account
    if err := c.ShouldBindJSON(&account); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	//Call function checkValidUser to check if the account is valid
    if err := entities.CheckValidUser(account, db); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid email or password! Please try again"})
        return
    }

	//Generate a JWT
	token, err := services.GenerateAuthorizedToken(account.Email)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"token": token})
}

