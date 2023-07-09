package handlers

import (
	"database/sql"
	"net/http"
	"net/mail"

	"github.com/gin-gonic/gin"
	"github.com/quyld17/E-Commerce-Website/entities"
)

func SignUp(c *gin.Context, db *sql.DB) {
	var newUser entities.User
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err := mail.ParseAddress(newUser.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email address! Email must include '@' and a domain"})
		return
	}
	if newUser.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password must not be empty! Please try again"})
		return
	}

	if err := entities.RegisterNewUser(newUser, db); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Account already existed! Please try again"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Account created successfully!"})
}
