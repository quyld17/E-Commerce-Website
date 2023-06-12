package handlers

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func SignIn(c *gin.Context, db *sql.DB) {
    var account User

    //Extract data from received JSON file to account
    if err := c.ShouldBindJSON(&account); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	//Call function checkValidUser to check if the account is valid
    if err := checkValidUser(account, db); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid email or password! Please try again"})
        return
    }

	//Generate a JWT
	token, err := generateToken(account.Email)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"token": token})
}

func generateToken(email string) (string, error) {
    // Create a new token object
    token := jwt.New(jwt.SigningMethodHS256)

    // Set the claims (payload) for the token
    claims := token.Claims.(jwt.MapClaims)
    claims["email"] = email
    claims["exp"] = time.Now().Add(time.Hour * 24).Unix() 
	// Token expiration time (1 day)

    // Set the secret key for signing the token
    secret := []byte("quydeptrai")
    tokenString, err := token.SignedString(secret)
    if err != nil {
        return "", err
    }

    return tokenString, nil
}

//Check if the account input is valid
func checkValidUser(account User, db *sql.DB) (error) {
	//Select email, password from user table if email=account.Email and password=account.Password
	//Store result in 'rows'
	rows, err := db.Query("SELECT email, password FROM user WHERE email = ? AND password = ?", account.Email, account.Password)
	if err != nil {
		return fmt.Errorf("%v", err)
	}
	defer rows.Close()
	
	//Check if 'rows' stores anything or not
	//If true, email and password are matched
	if rows.Next() {
		return nil
	}
	return fmt.Errorf("%v", err)
}