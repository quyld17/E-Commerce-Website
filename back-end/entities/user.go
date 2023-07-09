package entities

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
)

type User struct {
	Email       string `json:"email"`
	Password    string `json:"password"`
	FullName    string `json:"full_name"`
	PhoneNumber string `json:"phone_number"`
}

type Address struct {
	City        string `json:"city"`
	District    string `json:"district"`
	Ward        string `json:"ward"`
	Street      string `json:"street"`
	HouseNumber string `json:"house_number"`
	IsDefault   int    `json:"is_default"`
}

func CheckValidUser(account User, db *sql.DB) error {
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

func GetUserInfosAndAddress(userID int, db *sql.DB) (User, Address, string, error) {
	row, err := db.Query("SELECT full_name, phone_number FROM user where user_id = ?;", userID)
	if err != nil {
		log.Fatal(err)
	}
	var user User
	if row.Next() {
		err := row.Scan(&user.FullName, &user.PhoneNumber)
		if err != nil {
			log.Fatal(err)
		}
	}

	row, err = db.Query("SELECT city, district, ward, street, house_number FROM address WHERE user_id = ? and is_default = 1;", userID)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	var address Address
	if row.Next() {
		err := row.Scan(&address.City, &address.District, &address.Ward, &address.Street, &address.HouseNumber)
		if err != nil {
			log.Fatal(err)
		}
	}
	addressDisplay := address.HouseNumber + ", " + address.Street + ", " + address.Ward + ", " + address.District + ", " + address.City

	return user, address, addressDisplay, nil
}

func GetUserID(c *gin.Context, db *sql.DB) (int, error) {
	email := c.GetString("email")
	row := db.QueryRow("SELECT user_id FROM user WHERE email = ?", email)
	var userID int
	if err := row.Scan(&userID); err != nil {
		log.Fatal(err)
		return 0, nil
	}
	return userID, nil
}
