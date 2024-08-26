package cart

import (
	"database/sql"
	"fmt"

	"github.com/labstack/echo/v4"
	products "github.com/quyld17/E-Commerce-Website/entities/product"
)

func GetProducts(selected string, userID int, c echo.Context, db *sql.DB) ([]products.Product, error) {
	var args []interface{}

	query := `
		SELECT 
			cp.product_id, 
			cp.quantity, 
			cp.selected, 
			p.product_name, 
			p.price, 
			p.in_stock_quantity, 
			pi.image_url 
		FROM 
			cart_products cp
		JOIN 
			products p ON cp.product_id = p.product_id
		JOIN 
			product_images pi ON cp.product_id = pi.product_id
		WHERE 
			cp.user_id = ? AND 
			pi.is_thumbnail = 1
		`
	args = append(args, userID)

	if selected == "true" {
		query += "AND cp.selected = ?"
		args = append(args, true)
	}

	rows, err := db.Query(query, args...)

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
		INSERT INTO cart_products (user_id, product_id, quantity) 
		VALUES (?, ?, ?)
		ON DUPLICATE KEY UPDATE quantity = quantity + ?;
	`, userID, productID, quantity, quantity)
	if err != nil {
		return fmt.Errorf("Failed to add product to cart! Please try again")
	}

	return nil
}

func Update(userID, productID, quantity int, selected bool, c echo.Context, db *sql.DB) error {
	row, err := db.Query(`	
		SELECT * 
		FROM cart_products
		WHERE 
			user_id = ? AND 
			product_id = ?;
		`, userID, productID)
	if err != nil {
		return err
	}
	defer row.Close()

	if row.Next() {
		if quantity <= 0 {
			_, err := db.Exec(`	
				DELETE FROM cart_products 
				WHERE 
					user_id = ? AND
					product_id = ?;
				`, userID, productID)
			if err != nil {
				return err
			}
		} else {
			_, err := db.Exec(`
				UPDATE cart_products
				SET
					quantity = ?,
					selected = ?
				WHERE
					user_id = ? AND
					product_id = ?;
				`, quantity, selected, userID, productID)
			if err != nil {
				return err
			}
		}
	} else {
		return fmt.Errorf("Product not in cart. Please try again")
	}

	return nil
}

func DeleteProduct(userID, productID int, c echo.Context, db *sql.DB) error {
	row, err := db.Query(`	
		SELECT * 
		FROM cart_products
		WHERE 
			user_id = ? AND 
			product_id = ?;
		`, userID, productID)
	if err != nil {
		return err
	}
	defer row.Close()

	if row.Next() {
		_, err := db.Exec(`	
			DELETE FROM cart_products
			WHERE 
				user_id = ? AND 
				product_id = ?;
			`, userID, productID)
		if err != nil {
			return err
		}
	} else {
		return fmt.Errorf("Product not in cart. Please try again")
	}

	return nil
}
