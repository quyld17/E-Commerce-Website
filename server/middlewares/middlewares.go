package middlewares

import (
	"fmt"
	"net/http"
	"net/mail"
	"os"
	"strconv"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	users "github.com/quyld17/E-Commerce-Website/entities/user"
	jwtHandler "github.com/quyld17/E-Commerce-Website/services/jwt"
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

func JWTAuthorize(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		err := godotenv.Load(".env")
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err)
		}

		// Retrieve the JWT token from the request header
		tokenString := jwtHandler.GetToken(c)
		if tokenString == "" {
			return echo.NewHTTPError(http.StatusUnauthorized, "Unauthorized")
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET_KEY")), nil
		})
		if err != nil || !token.Valid {
			return echo.NewHTTPError(http.StatusUnauthorized, "Unauthorized")
		}

		email := jwtHandler.GetClaims(token, "email")
		if email == "" {
			return echo.NewHTTPError(http.StatusBadRequest, "Invalid claims")
		}
		c.Set("email", email)

		return next(c)
	}
}

func Pagination(c echo.Context, itemsPerPage int) (int, error) {
	pageStr := c.QueryParam("page")
	page, err := strconv.Atoi(pageStr)
	if err != nil {
		return 0, fmt.Errorf("Invalid page number")
	}

	offset := (page - 1) * itemsPerPage

	return offset, nil
}
