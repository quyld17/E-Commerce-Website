package orders

import (
	"database/sql"

	"github.com/labstack/echo/v4"
	"github.com/quyld17/E-Commerce-Website/entities/cart"
	products "github.com/quyld17/E-Commerce-Website/entities/product"
	users "github.com/quyld17/E-Commerce-Website/entities/user"
)

type Order struct {
	OrderID       int            `json:"order_id"`
	UserID        int            `json:"user_id"`
	TotalPrice    int            `json:"total_price"`
	PaymentMethod string         `json:"payment_method"`
	Status        string         `json:"status"`
	CreatedAt     string         `json:"created_at"`
	Products      []OrderProduct `json:"products"`
}

type OrderProduct struct {
	OrderID     int    `json:"order_id"`
	ProductID   int    `json:"product_id"`
	ProductName string `json:"product_name"`
	Quantity    int    `json:"quantity"`
	Price       int    `json:"price"`
	ImageURL    string `json:"image_url"`
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

	result, err := transaction.Exec(`
		INSERT INTO`+"`order`"+`(user_id, total_price, payment_method, status) 
		VALUES (?, ?, ?, ?)
		`, userID, totalPrice, paymenMethod, "Delivering")
	if err != nil {
		return err
	}

	orderID, err := result.LastInsertId()
	if err != nil {
		return err
	}

	stmt, err := transaction.Prepare(`	
		INSERT INTO order_products 
			(order_id, 
			product_id, 
			product_name, 
			quantity, price, 
			image_url)
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

func GetAll(userID int, c echo.Context, db *sql.DB) ([]Order, error) {
	rows, err := db.Query(`
		SELECT 
			order_id,
			total_price,
			status,
			created_at,
			payment_method
		FROM `+"`order`"+
		`WHERE user_id = ?;
		`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	orders := []Order{}
	for rows.Next() {
		var order Order
		err := rows.Scan(&order.OrderID, &order.TotalPrice, &order.Status, &order.CreatedAt, &order.PaymentMethod)
		if err != nil {
			return nil, err
		}

		productRows, err := db.Query(`
			SELECT * 
			FROM order_products 
			WHERE order_id = ?;
			`, order.OrderID)
		if err != nil {
			return nil, err
		}
		defer productRows.Close()
		for productRows.Next() {
			var product OrderProduct
			err := productRows.Scan(&product.OrderID, &product.ProductID, &product.ProductName, &product.Quantity, &product.Price, &product.ImageURL)
			if err != nil {
				return nil, err
			}
			order.Products = append(order.Products, product)
		}
		err = productRows.Err()
		if err != nil {
			return nil, err
		}

		orders = append(orders, order)
	}
	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return orders, nil
}
