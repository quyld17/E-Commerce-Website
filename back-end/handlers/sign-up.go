package handlers

import (
	"database/sql"
	"net/http"
	"net/mail"

	"github.com/labstack/echo/v4"
	users "github.com/quyld17/E-Commerce-Website/entities/user"
)

func SignUp(c echo.Context, db *sql.DB) error {
	var newUser users.User
	if err := c.Bind(&newUser); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	_, err := mail.ParseAddress(newUser.Email)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid email address! Email must include '@' and a domain")
	}
	if newUser.Password == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Password must not be empty! Please try again")
	}

	if err := users.CreateNewUser(newUser, db); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Account already existed! Please try again")
	}

	return c.JSON(http.StatusOK, "Account created successfully!")
}
