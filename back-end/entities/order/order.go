package orders

import (
	"database/sql"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/quyld17/E-Commerce-Website/entities/cart"
	products "github.com/quyld17/E-Commerce-Website/entities/product"
	users "github.com/quyld17/E-Commerce-Website/entities/user"
)

type Order struct {
	OrderID       int       `json:"order_id"`
	UserID        int       `json:"user_id"`
	TotalPrice    int       `json:"total_price"`
	PaymentMethod string    `json:"payment_method"`
	Status        string    `json:"status"`
	CreatedAt     time.Time `json:"created_at"`
}

type OrderProducts struct {
	OrderID     int    `json:"order_id"`
	ProductID   int    `json:"product_id"`
	ProductName string `json:"product_name"`
	Quantity    string `json:"quantity"`
	Price       string `json:"price"`
}

func Create(user *users.User, address *users.Address, orderedProducts []products.Product, userID, totalPrice int, paymenMethod string, c echo.Context, db *sql.DB) error {
	// Start a transaction
	transaction, err := db.Begin()
	if err != nil {
		return err
	}
	defer func() {
		// Rollback the transaction if there's an error
		if err != nil {
			transaction.Rollback()
		}
	}()

	result, err := transaction.Exec(`INSERT INTO`+"`order`"+`(user_id, total_price, payment_method, status) 
									VALUES (?, ?, ?, ?)`,
		userID, totalPrice, paymenMethod, "Delivering")
	if err != nil {
		return err
	}

	orderID, err := result.LastInsertId()
	if err != nil {
		return err
	}

	stmt, err := transaction.Prepare(`	INSERT INTO order_products 
											(order_id, product_id, product_name, quantity, price, image_url)
	 									VALUES (?, ?, ?, ?, ?, ?);`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	for _, product := range orderedProducts {
		_, err := stmt.Exec(orderID, product.ProductID, product.ProductName, product.Quantity, product.Price, product.ImageURL)
		if err != nil {
			return err
		}
		if err := cart.DeleteProduct(userID, product.ProductID, c, db); err != nil {
			return err
		}
	}

	err = transaction.Commit()
	if err != nil {
		return err
	}

	return nil
}
