package handlers

import (
	"database/sql"
	"net/http"

	"github.com/labstack/echo/v4"
	users "github.com/quyld17/E-Commerce-Website/entities/user"
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

	if user.Password == "" || user.NewPassword == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "All fields must be filled! Please try again")
	} else if len(user.Password) > 255 || len(user.NewPassword) > 255 {
		return echo.NewHTTPError(http.StatusBadRequest, "Input exceeds limit! Please try again")
	} else if user.Password == user.NewPassword {
		return echo.NewHTTPError(http.StatusBadRequest, "New password must be different from current password! Please try again")
	}

	if err := users.ChangePassword(userID, user.Password, user.NewPassword, c, db); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	return c.JSON(http.StatusOK, "Updated successfully!")
}
