package entities

import (
	"database/sql"
	"log"

	"github.com/gin-gonic/gin"
)

type Product struct {
	ProductID		int 	`json:"product_id"`
	ProductIDString string 	`json:"product_id_string"`
	CategoryID 		int 	`json:"category_id"`
	ProductName 	string 	`json:"product_name"`
	Price       	int    	`json:"price"`
	InStockQuantity int		`json:"in_stock_quantity"`
	ImageURL    	string 	`json:"image_url"`
	Quantity 		int 	`json:"quantity"`
}

type ProductImage struct {
	ProductID		int 	`json:"product_id"`
	ImageURL    	string 	`json:"image_url"`
	IsThumbnail 	int 	`json:"is_thumbnail"`
}

func GetAllProducts(c *gin.Context, db *sql.DB) ([]Product, error) {
    rows, err := db.Query("SELECT product.product_id, product.product_name, product.price, product.category_id, product_image.image_url FROM product, product_image WHERE product_image.is_thumbnail = 1 AND product.product_id = product_image.product_id;")
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer rows.Close()

    productDetails := []Product{}
	for rows.Next() {
		var product Product
		err := rows.Scan(&product.ProductID, &product.ProductName, &product.Price, &product.CategoryID, &product.ImageURL)
		if err != nil {
			log.Fatal(err)
			return nil, err
		}
		productDetails = append(productDetails, product)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return productDetails, nil
}

func GetSpecificProductDetail(productID int, c *gin.Context, db *sql.DB) (Product, []ProductImage, error) {
	rows, err := db.Query("SELECT product.product_id, product.product_name, product.price, product.in_stock_quantity, product_image.image_url, product_image.is_thumbnail FROM product JOIN product_image ON product.product_id = product_image.product_id WHERE product.product_id = ?;", productID)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	productDetail := Product{}
	productImages := []ProductImage{}

	for rows.Next() {
		var product Product
		var productImage ProductImage

		err := rows.Scan(&product.ProductID, &product.ProductName, &product.Price, &product.InStockQuantity, &productImage.ImageURL, &productImage.IsThumbnail)
		if err != nil {
			log.Fatal(err)
		}

		productDetail = product
		productImages = append(productImages, productImage)
	}

	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	return productDetail, productImages, nil
}

func AddProductToCart(userID int, productID int, quantity int, c *gin.Context, db *sql.DB) error {
	// Check if the product already exists in the cart
	row := db.QueryRow("SELECT product_id FROM cart_product WHERE user_id = ? AND product_id = ?", userID, productID)
	var existingProductID int
	if err := row.Scan(&existingProductID); err != nil {
		if err == sql.ErrNoRows {
			// Product doesn't exist in the cart, insert a new row
			_, err = db.Exec("INSERT INTO cart_product (user_id, product_id, quantity) VALUES (?, ?, ?)", userID, productID, quantity)
			if err != nil {
				log.Fatal(err)
			}
		} else {
			log.Fatal(err)
		}
	} else {
			// Product already exists in the cart, update the quantity
			_, err = db.Exec("UPDATE cart_product SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?", quantity, userID, productID)
			if err != nil {
				log.Fatal(err)
			}
	}

	return nil
}

func CartProducts(userID int, c *gin.Context, db *sql.DB) ([]Product, error) {
	rows, err := db.Query("SELECT cart_product.product_id, cart_product.quantity, product.product_name, product.price, product.in_stock_quantity, product_image.image_url FROM cart_product, product, product_image WHERE cart_product.user_id = ? AND cart_product.product_id = product.product_id AND cart_product.product_id = product_image.product_id AND product_image.is_thumbnail = 1", userID)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	cartProducts := []Product{}
	for rows.Next() {
		var product Product
		err := rows.Scan(&product.ProductID, &product.Quantity, &product.ProductName, &product.Price, &product.InStockQuantity, &product.ImageURL)
		if err != nil {
			log.Fatal(err)
		}
		cartProducts = append(cartProducts, product)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	return cartProducts, nil
}

func ChangeCartProductQuantity(userID int, productID int, quantity int, c *gin.Context, db *sql.DB) error {
	if quantity == 0 {
		_, err := db.Exec("DELETE FROM cart_product WHERE user_id = ? AND product_id = ?;", userID, productID)
		if err != nil {
			log.Fatal(err)
			return err
		}
	} else {
		_, err := db.Exec("UPDATE cart_product SET quantity = ? WHERE user_id = ? AND product_id = ?", quantity, userID, productID)
		if err != nil {
			log.Fatal(err)
			return err
		}
	}
	return nil	
}

func ProductsForCheckout(userID, productID int, c *gin.Context, db *sql.DB) (Product, error) {
	row, err := db.Query("SELECT product.product_id, product.product_name, product.price, product_image.image_url, cart_product.quantity FROM product, product_image, cart_product WHERE product.product_id = ? AND cart_product.user_id = ? AND product_image.product_id = product.product_id AND product_image.is_thumbnail = 1;", productID, userID)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	var product Product
	if row.Next() {
		err := row.Scan(&product.ProductID, &product.ProductName, &product.Price, &product.ImageURL, &product.Quantity)
		if err != nil {
			log.Fatal(err)
		}
	}
	return product, nil
}
