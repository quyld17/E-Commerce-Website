package handlers

import (
	"database/sql"
	"net/http"

	"github.com/labstack/echo/v4"
	users "github.com/quyld17/E-Commerce-Website/entities/user"
)

func GetUserDetails(c echo.Context, db *sql.DB) error {
	userID, err := users.GetUserID(c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	user, address, err := users.GetUserInfosAndAddress(userID, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	return c.JSON(http.StatusOK, echo.Map{
		"user":    user,
		"address": address,
	})
}
