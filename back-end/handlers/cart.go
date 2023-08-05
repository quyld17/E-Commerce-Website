package handlers

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/quyld17/E-Commerce-Website/entities/cart"
	products "github.com/quyld17/E-Commerce-Website/entities/product"
	users "github.com/quyld17/E-Commerce-Website/entities/user"
)

func GetCartProducts(c echo.Context, db *sql.DB, selected string) error {
	userID, err := users.GetID(c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	products := []products.Product{}
	if selected == "1" {
		products, err = cart.GetSelectedProducts(userID, c, db)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err)
		}
	} else if selected == "" {
		products, err = cart.GetAllProducts(userID, c, db)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err)
		}
	} else {
		return echo.NewHTTPError(http.StatusBadRequest, "Failed get cart's products at the moment. Please try again")
	}

	totalPrice := 0
	for _, product := range products {
		if product.Selected == 1 {
			totalPrice += product.Quantity * product.Price
		}
	}

	return c.JSON(http.StatusOK, echo.Map{
		"cart_products": products,
		"total_price":   totalPrice,
	})
}

func AddProductToCart(c echo.Context, db *sql.DB) error {
	userID, err := users.GetID(c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	var product products.Product
	if err := c.Bind(&product); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	if err := cart.UpSertProduct(userID, product.ProductID, product.Quantity, c, db); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to add product to cart. Please try again")
	}

	return c.JSON(http.StatusOK, "Add product to cart successfully!")
}

func UpdateCart(c echo.Context, db *sql.DB, task string) error {
	userID, err := users.GetID(c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	switch task {
	case "adjust_quantity":
		var product products.Product
		if err := c.Bind(&product); err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, err)
		}
		err, errString := cart.AdjustProductQuantity(userID, product.ProductID, product.Quantity, c, db)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err)
		} else if errString != "" {
			return echo.NewHTTPError(http.StatusBadRequest, errString)
		}

		return c.JSON(http.StatusOK, "Adjust quantity successfully!")
	case "select_product":
		products := []products.Product{}
		if err := c.Bind(&products); err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, err)
		}
		for _, product := range products {
			err, errString := cart.SelectProducts(userID, product.ProductID, c, db)
			if err != nil {
				return echo.NewHTTPError(http.StatusInternalServerError, err)
			} else if errString != "" {
				return echo.NewHTTPError(http.StatusBadRequest, errString)
			}
		}

		return c.JSON(http.StatusOK, "Select product successfully!")
	default:
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid task")

	}
}

func DeleteCartProduct(productID string, c echo.Context, db *sql.DB) error {
	userID, err := users.GetID(c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	id, err := strconv.Atoi(productID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid product ID format. Please try again")
	}

	err, errString := cart.DeleteProduct(userID, id, c, db)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	} else if errString != "" {
		return echo.NewHTTPError(http.StatusBadRequest, errString)
	}

	return c.JSON(http.StatusOK, "Delete product successfully!")
}
