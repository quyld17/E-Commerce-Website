package handlers

import (
	"database/sql"
	"net/http"

	"github.com/labstack/echo/v4"
	users "github.com/quyld17/E-Commerce-Website/entities/user"
	"github.com/quyld17/E-Commerce-Website/middlewares"
)

func SignUp(c echo.Context, db *sql.DB) error {
	var newUser users.User
	if err := c.Bind(&newUser); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	if err := middlewares.ValidateEmailAndPassword(newUser); err != "" {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	if err := users.Create(newUser, db); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Account already existed! Please try again")
	}

	return c.JSON(http.StatusOK, "Account created successfully!")
}
