package handlers

import (
	"database/sql"
	"net/http"

	"github.com/labstack/echo/v4"
	categories "github.com/quyld17/E-Commerce-Website/entities/category"
)

func GetAllCategories(c echo.Context, db *sql.DB) error {
	categories, err := categories.GetAll(c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Unable to retrieve categories at the moment. Please try again")
	}

	return c.JSON(http.StatusOK, categories)
}
