package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func JWTAuthorize(c *gin.Context) {
	// Get the JWT token from the request headers
	tokenString := c.GetHeader("Authorization")

	// Validate the JWT token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte("quyld17"), nil
	})
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		c.Abort()
		return
	}

	// Check if the token is valid and has the expected signing method
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// Access the claims and user information
		email := claims["email"].(string)
		// Store the user's email in the Gin context for later use
		c.Set("email", email)
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		c.Abort()
		return
	}

	// Call the next handler
	c.Next()
}