package users

import (
	"database/sql"
	"time"

	"github.com/labstack/echo/v4"
)

type User struct {
	UserId            int       `json:"user_id"`
	Email             string    `json:"email"`
	Password          string    `json:"password"`
	NewPassword       string    `json:"new_password"`
	FullName          string    `json:"full_name"`
	DateOfBirth       time.Time `json:"date_of_birth"`
	DateOfBirthString string    `json:"date_of_birth_string"`
	PhoneNumber       string    `json:"phone_number"`
	Gender            int       `json:"gender"`
}

type Address struct {
	City        string `json:"city"`
	District    string `json:"district"`
	Ward        string `json:"ward"`
	Street      string `json:"street"`
	HouseNumber string `json:"house_number"`
	IsDefault   int    `json:"is_default"`
}

func Authenticate(account User, db *sql.DB) error {
	rows, err := db.Query(`	
		SELECT 
			email, 
			password 
		FROM user 
		WHERE 
			email = ? AND 
			password = ?
		`, account.Email, account.Password)
	if err != nil {
		return err
	}
	defer rows.Close()
	if rows.Next() {
		return nil
	}
	return err
}

func Create(newUser User, db *sql.DB) error {
	_, err := db.Exec(`	
		INSERT INTO user (email, password) 
		VALUES (?, ?)
		`, newUser.Email, newUser.Password)
	if err != nil {
		return err
	}
	return nil
}

func GetDetails(userID int, db *sql.DB) (*User, *Address, error) {
	row, err := db.Query(`
		SELECT
			email,
			full_name,
			phone_number,
			gender,
			date_of_birth
		FROM user
		WHERE user_id = ?;
		`, userID)
	if err != nil {
		return nil, nil, err
	}

	var user User
	if row.Next() {
		err := row.Scan(&user.Email, &user.FullName, &user.PhoneNumber, &user.Gender, &user.DateOfBirth)
		if err != nil {
			return nil, nil, err
		}
	}
	user.DateOfBirthString = user.DateOfBirth.Format("2006-01-02")

	row, err = db.Query(`
		SELECT
			city,
			district,
			ward,
			street,
			house_number
		FROM address
		WHERE
			user_id = ? AND
			is_default = 1;
		`, userID)
	if err != nil {
		return nil, nil, err
	}
	defer row.Close()

	var address Address
	if row.Next() {
		err := row.Scan(&address.City, &address.District, &address.Ward, &address.Street, &address.HouseNumber)
		if err != nil {
			return nil, nil, err
		}
	}

	return &user, &address, nil
}

func GetID(c echo.Context, db *sql.DB) (int, error) {
	email := c.Get("email").(string)
	row := db.QueryRow(`
		SELECT user_id 
		FROM user 
		WHERE email = ?
		`, email)
	var userID int
	if err := row.Scan(&userID); err != nil {
		return 0, err
	}
	return userID, nil
}

func ChangePassword(userID int, password, newPassword string, c echo.Context, db *sql.DB) string {
	row, err := db.Query(`
		SELECT password
		FROM user
		WHERE
			user_id = ? AND
			password = ?
		`, userID, password)
	if err != nil {
		return "Error while changing password! Please try again"
	}
	defer row.Close()
	if row.Next() {
		_, err := db.Exec(`	
			UPDATE user 
			SET password = ? 
			WHERE user_id = ?
			`, newPassword, userID)
		if err != nil {
			return "Error while changing password! Please try again"
		}
	} else {
		return "Wrong password! Plase try again"
	}

	return ""
}
