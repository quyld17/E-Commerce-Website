package middlewares

import (
	"net/mail"

	users "github.com/quyld17/E-Commerce-Website/entities/user"
)

func ValidateEmailAndPassword(user users.User) string {
	_, err := mail.ParseAddress(user.Email)
	if err != nil {
		return "Invalid email address! Please try again"
	}
	if user.Password == "" {
		return "Password must not be empty! Please try again"
	} else if len(user.Email) > 255 || len(user.Password) > 255 {
		return "Input exceeds limit! Please try again"
	}
	return ""
}

func ValidatePasswordChange(user users.User) string {
	if user.Password == "" {
		return "Current password must not be empty! Please try again"
	} else if user.NewPassword == "" {
		return "New password must not be empty! Please try again"
	} else if user.Password == user.NewPassword {
		return "New password must be different from current password! Please try again"
	} else if len(user.NewPassword) > 255 {
		return "Input exceeds limit! Please try again"
	}
	return ""
}
