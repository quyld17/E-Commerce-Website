package handlers

import (
	"database/sql"
	"net/http"

	"github.com/labstack/echo/v4"
	users "github.com/quyld17/E-Commerce-Website/entities/user"
	"github.com/quyld17/E-Commerce-Website/middlewares"
	"github.com/quyld17/E-Commerce-Website/services/jwt"
)

func SignIn(c echo.Context, db *sql.DB) error {
	var account users.User
	if err := c.Bind(&account); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	if err := middlewares.ValidateEmailAndPassword(account); err != "" {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	err := users.Authenticate(account, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
	}

	token, err := jwt.Generate(account.Email)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, echo.Map{"token": token})
}
