package handlers

import (
	"database/sql"
	"net/http"
	"net/mail"

	"github.com/gin-gonic/gin"
	"github.com/quyld17/E-Commerce-Website/entities"
	"github.com/quyld17/E-Commerce-Website/services"
)

func SignIn(c *gin.Context, db *sql.DB) {
    var account entities.User
    if err := c.ShouldBindJSON(&account); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    _, err := mail.ParseAddress(account.Email)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email address! Email must include '@' and a domain"})
        return
    }
    if account.Password == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Password must not be empty! Please try again"})
        return
    }

    if err := entities.CheckValidUser(account, db); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid email or password! Please try again"})
        return
    }

	token, err := services.GenerateAuthorizedToken(account.Email)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Sign in unsuccessfully. Please try again"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"token": token})
}

