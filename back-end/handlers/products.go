package handlers

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	products "github.com/quyld17/E-Commerce-Website/entities/product"
)

func GetAllProducts(c echo.Context, db *sql.DB) error {
	productDetails, err := products.GetAll(c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Unable to retrieve products at the moment. Please try again")
	}

	return c.JSON(http.StatusOK, productDetails)
}

func GetProductDetails(productID string, c echo.Context, db *sql.DB) error {
	id, err := strconv.Atoi(productID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	productDetail, productImages, err := products.GetSingleProductDetails(id, c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to retrieve product's details")
	}

	return c.JSON(http.StatusOK, echo.Map{
		"product_detail": productDetail,
		"product_images": productImages,
	})
}
