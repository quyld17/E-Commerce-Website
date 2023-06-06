package handlers

import (
	"database/sql"
	"time"
)

var db *sql.DB

type User struct {
	Email      string    `json:"email"`
	Password   string    `json:"password"`
	Created_at time.Time `json:"signUpDate"`
}