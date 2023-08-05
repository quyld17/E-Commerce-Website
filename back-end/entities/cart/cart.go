package cart

import (
	"database/sql"

	"github.com/labstack/echo/v4"
	products "github.com/quyld17/E-Commerce-Website/entities/product"
)

func GetAllProducts(userID int, c echo.Context, db *sql.DB) ([]products.Product, error) {
	rows, err := db.Query(`
		SELECT 
			cart_product.product_id, 
			cart_product.quantity, 
			cart_product.selected, 
			product.product_name, 
			product.price, 
			product.in_stock_quantity, 
			product_image.image_url 
		FROM 
			cart_product, 
			product, 
			product_image 
		WHERE 
			cart_product.user_id = ? AND 
			cart_product.product_id = product.product_id AND 
			cart_product.product_id = product_image.product_id AND 
			product_image.is_thumbnail = 1;
	`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	cartProducts := []products.Product{}
	for rows.Next() {
		var product products.Product
		err := rows.Scan(&product.ProductID, &product.Quantity, &product.Selected, &product.ProductName, &product.Price, &product.InStockQuantity, &product.ImageURL)
		if err != nil {
			return nil, err
		}
		cartProducts = append(cartProducts, product)
	}
	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return cartProducts, nil
}

func UpSertProduct(userID int, productID int, quantity int, c echo.Context, db *sql.DB) error {
	_, err := db.Exec(`
		INSERT INTO cart_product (user_id, product_id, quantity) 
		VALUES (?, ?, ?)
		ON DUPLICATE KEY UPDATE quantity = quantity + ?;
	`, userID, productID, quantity, quantity)
	if err != nil {
		return err
	}

	return nil
}

func AdjustProductQuantity(userID int, productID int, quantity int, c echo.Context, db *sql.DB) error {
	_, err := db.Exec(`	
		UPDATE cart_product 
		SET quantity = ? 
		WHERE 
			user_id = ? AND 
			product_id = ?;
	`, quantity, userID, productID)
	if err != nil {
		return err
	}

	return nil
}

func SelectProducts(userID, productID int, c echo.Context, db *sql.DB) error {
	_, err := db.Exec(`
		UPDATE cart_product 
		SET selected = (1 - selected)
		WHERE 
			user_id = ? AND 
			product_id = ?;
	`, userID, productID)
	if err != nil {
		return err
	}

	return nil
}

func GetSelectedProducts(userID int, c echo.Context, db *sql.DB) ([]products.Product, error) {
	rows, err := db.Query(`
		SELECT 
			cart_product.product_id, 
			cart_product.quantity, 
			cart_product.selected, 
			product.product_name, 
			product.price, 
			product_image.image_url 
		FROM 
			cart_product, 
			product, 
			product_image 
		WHERE 
			cart_product.user_id = ? AND 
			cart_product.product_id = product.product_id AND 
			cart_product.selected = 1 AND
			cart_product.product_id = product_image.product_id AND 
			product_image.is_thumbnail = 1;
	`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	selectedProducts := []products.Product{}
	for rows.Next() {
		var product products.Product
		err := rows.Scan(&product.ProductID, &product.Quantity, &product.Selected, &product.ProductName, &product.Price, &product.ImageURL)
		if err != nil {
			return nil, err
		}
		selectedProducts = append(selectedProducts, product)
	}
	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return selectedProducts, nil
}

func DeleteProduct(userID, productID int, c echo.Context, db *sql.DB) error {
	_, err := db.Exec(`	
		DELETE FROM cart_product 
		WHERE 
			user_id = ? AND 
			product_id = ?;
		`, userID, productID)
	if err != nil {
		return err
	}

	return nil
}
