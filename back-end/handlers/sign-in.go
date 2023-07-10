package handlers

import (
	"database/sql"
	"net/http"
	"net/mail"

	"github.com/labstack/echo/v4"
	users "github.com/quyld17/E-Commerce-Website/entities/user"
	"github.com/quyld17/E-Commerce-Website/services/jwt"
)

func SignIn(c echo.Context, db *sql.DB) error {
	var account users.User
	if err := c.Bind(&account); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	_, err := mail.ParseAddress(account.Email)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid email address! Email must include '@' and a domain")
	}
	if account.Password == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Password must not be empty! Please try again")
	}

	if err := users.CheckValidUser(account, db); err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid email or password! Please try again")
	}

	token, err := jwt.Generate(account.Email)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, echo.Map{"token": token})
}
