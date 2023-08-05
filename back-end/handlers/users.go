package handlers

import (
	"database/sql"
	"net/http"

	"github.com/labstack/echo/v4"
	users "github.com/quyld17/E-Commerce-Website/entities/user"
	"github.com/quyld17/E-Commerce-Website/middlewares"
)

func GetUserDetails(c echo.Context, db *sql.DB) error {
	userID, err := users.GetID(c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	user, address, err := users.GetDetails(userID, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, echo.Map{
		"user":    user,
		"address": address,
	})
}

func UpdateUserDetails(c echo.Context, db *sql.DB) error {
	userID, err := users.GetID(c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	var user users.User
	if err := c.Bind(&user); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	if user.Password != "" && user.NewPassword != "" {
		if err := middlewares.ValidatePasswordChange(user); err != "" {
			return echo.NewHTTPError(http.StatusBadRequest, err)
		}

		if err := users.ChangePassword(userID, user.Password, user.NewPassword, c, db); err != "" {
			return echo.NewHTTPError(http.StatusBadRequest, err)
		}
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, "Failed to update user. Please try again")
	}

	return c.JSON(http.StatusOK, "Updated successfully!")
}
