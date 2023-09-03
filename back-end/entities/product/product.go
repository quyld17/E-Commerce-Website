package products

import (
	"database/sql"

	"github.com/labstack/echo/v4"
)

type Product struct {
	ProductID       int    `json:"product_id"`
	CategoryID      int    `json:"category_id"`
	ProductName     string `json:"product_name"`
	Price           int    `json:"price"`
	InStockQuantity int    `json:"in_stock_quantity"`
	ImageURL        string `json:"image_url"`
	Quantity        int    `json:"quantity"`
	Selected        bool   `json:"selected"`
}

type ProductImage struct {
	ProductID   int    `json:"product_id"`
	ImageURL    string `json:"image_url"`
	IsThumbnail int    `json:"is_thumbnail"`
}

func GetByPage(c echo.Context, db *sql.DB, offset, limit int) ([]Product, int, error) {
	rows, err := db.Query(`
        SELECT 
            product.product_id, 
            product.product_name, 
            product.price, 
            product.category_id, 
            product_image.image_url 
        FROM 
            product, 
            product_image 
        WHERE 
            product_image.is_thumbnail = 1 AND 
            product.product_id = product_image.product_id
        LIMIT ? OFFSET ?;
		`, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var numOfProds int
	row := db.QueryRow(`
		SELECT COUNT(*) 
		FROM product;
		`)
	if err := row.Scan(&numOfProds); err != nil {
		return nil, 0, err
	}

	productDetails := []Product{}
	for rows.Next() {
		var product Product
		err := rows.Scan(&product.ProductID, &product.ProductName, &product.Price, &product.CategoryID, &product.ImageURL)
		if err != nil {
			return nil, 0, err
		}
		productDetails = append(productDetails, product)
	}
	err = rows.Err()
	if err != nil {
		return nil, 0, err
	}

	return productDetails, numOfProds, nil
}

func GetProductDetails(productID int, c echo.Context, db *sql.DB) (*Product, []ProductImage, error) {
	rows, err := db.Query(`
		SELECT 
			product.product_id, 
			product.product_name, 
			product.price, 
			product.in_stock_quantity, 
			product_image.image_url, 
			product_image.is_thumbnail 
		FROM product 
		JOIN product_image 
		ON product.product_id = product_image.product_id 
		WHERE product.product_id = ?;
		`, productID)
	if err != nil {
		return nil, nil, err
	}
	defer rows.Close()

	productDetail := Product{}
	productImages := []ProductImage{}

	for rows.Next() {
		var product Product
		var productImage ProductImage

		err := rows.Scan(&product.ProductID, &product.ProductName, &product.Price, &product.InStockQuantity, &productImage.ImageURL, &productImage.IsThumbnail)
		if err != nil {
			return nil, nil, err
		}

		productDetail = product
		productImages = append(productImages, productImage)
	}

	err = rows.Err()
	if err != nil {
		return nil, nil, err
	}

	return &productDetail, productImages, nil
}
