package handlers

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SignIn(c *gin.Context, db *sql.DB) {
    var account User

    //Extract data from JSON file received to account
    if err := c.ShouldBindJSON(&account); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	//Call function checkValidUser to check if the account is valid
    if err := checkValidUser(account, db); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid email or password! Please try again"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Sign in successfully!"})
}


//Check if the account input is valid
func checkValidUser(account User, db *sql.DB) (error) {
	//Select email, password from user table if email=account.Email and password=account.Password
	//Store result in rows if matched
	rows, err := db.Query("SELECT email, password FROM user WHERE email = ? AND password = ?", account.Email, account.Password)
	if err != nil {
		return fmt.Errorf("%v", err)
	}
	defer rows.Close()
	
	//Check if rows store anything or not
	//If true, email and password are matched
	if rows.Next() {
		return nil
	}
	return fmt.Errorf("%v", err)
}