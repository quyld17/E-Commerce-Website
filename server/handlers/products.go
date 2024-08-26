package handlers

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	products "github.com/quyld17/E-Commerce-Website/entities/product"
	"github.com/quyld17/E-Commerce-Website/middlewares"
)

func GetProductsByPage(c echo.Context, db *sql.DB) error {
	itemsPerPage := 5
	offset, err := middlewares.Pagination(c, itemsPerPage)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	products, numOfProds, err := products.GetByPage(c, db, offset, itemsPerPage)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Unable to retrieve products at the moment. Please try again")
	}

	return c.JSON(http.StatusOK, echo.Map{
		"products":     products,
		"num_of_prods": numOfProds,
	})
}

func GetProduct(productID string, c echo.Context, db *sql.DB) error {
	id, err := strconv.Atoi(productID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	productDetail, productImages, err := products.GetProductDetails(id, c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to retrieve product's details")
	}

	return c.JSON(http.StatusOK, echo.Map{
		"product_detail": productDetail,
		"product_images": productImages,
	})
}
