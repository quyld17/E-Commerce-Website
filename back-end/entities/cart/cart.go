package cart

import (
	"database/sql"
	"log"

	"github.com/labstack/echo/v4"
	products "github.com/quyld17/E-Commerce-Website/entities/product"
)

func GetAllProducts(userID int, c echo.Context, db *sql.DB) ([]products.Product, int, error) {
	rows, err := db.Query(`SELECT 
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
								product_image.is_thumbnail = 1;`,
		userID)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	cartProducts := []products.Product{}
	for rows.Next() {
		var product products.Product
		err := rows.Scan(&product.ProductID, &product.Quantity, &product.Selected, &product.ProductName, &product.Price, &product.InStockQuantity, &product.ImageURL)
		if err != nil {
			return nil, 0, err
		}
		cartProducts = append(cartProducts, product)
	}
	err = rows.Err()
	if err != nil {
		return nil, 0, err
	}

	totalPrice := 0
	for _, product := range cartProducts {
		if product.Selected == 1 {
			totalPrice += product.Quantity * product.Price
		}
	}
	return cartProducts, totalPrice, nil
}

func AddProduct(userID int, productID int, quantity int, c echo.Context, db *sql.DB) error {
	// Check if the product already exists in the cart
	row := db.QueryRow("SELECT product_id FROM cart_product WHERE user_id = ? AND product_id = ?;", userID, productID)
	var existingProductID int
	if err := row.Scan(&existingProductID); err != nil {
		if err == sql.ErrNoRows {
			// Product doesn't exist in the cart, insert a new row
			_, err = db.Exec("INSERT INTO cart_product (user_id, product_id, quantity) VALUES (?, ?, ?);", userID, productID, quantity)
			if err != nil {
				log.Fatal(err)
			}
		} else {
			log.Fatal(err)
		}
	} else {
		// Product already exists in the cart, update the quantity
		_, err = db.Exec("UPDATE cart_product SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?;", quantity, userID, productID)
		if err != nil {
			log.Fatal(err)
		}
	}

	return nil
}

func AdjustProductQuantity(userID int, productID int, quantity int, c echo.Context, db *sql.DB) error {
	if quantity == 0 {
		_, err := db.Exec("DELETE FROM cart_product WHERE user_id = ? AND product_id = ?;", userID, productID)
		if err != nil {
			log.Fatal(err)
			return err
		}
	} else {
		_, err := db.Exec("UPDATE cart_product SET quantity = ? WHERE user_id = ? AND product_id = ?;", quantity, userID, productID)
		if err != nil {
			log.Fatal(err)
			return err
		}
	}
	return nil
}

func SelectCartProducts(userID, productID int, c echo.Context, db *sql.DB) error {
	// rows, err := db.Query("SELECT user_id, product_id, selected FROM cart_product WHERE user_id = ? AND product_id = ?;", userID, productID)
	// if err != nil {
	// 	return err
	// }
	// defer rows.Close()

	// //Check if 'rows' stores anything or not
	// //If true, email and password are matched
	// if !rows.Next() {
	// 	return err
	// }

	_, err := db.Exec("UPDATE cart_product SET selected = 1 WHERE user_id = ? AND product_id = ?;", userID, productID)
	if err != nil {
		return err
	}
	return nil
}
