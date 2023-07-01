package entities

import (
	"database/sql"
	"fmt"
)

type User struct {
	Email      string    `json:"email"`
	Password   string    `json:"password"`
}

func GetUserByEmail(account User, db *sql.DB) error {
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

func RegisterNewUser(newUser User, db *sql.DB) error {
	_, err := db.Exec("INSERT INTO user (email, password) VALUES (?, ?)", newUser.Email, newUser.Password)
	if err != nil {
		return err
	}
	return nil
}