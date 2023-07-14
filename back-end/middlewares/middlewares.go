package middlewares

import (
	"net/mail"

	"github.com/labstack/echo/v4"
	users "github.com/quyld17/E-Commerce-Website/entities/user"
)

func ValidateEmailAndPassword(user users.User, c echo.Context) string {
	_, err := mail.ParseAddress(user.Email)
	if err != nil {
		return "Invalid email address! Email must include '@' and a domain"
	}
	if user.Password == "" {
		return "Password must not be empty! Please try again"
	}
	return ""
}
