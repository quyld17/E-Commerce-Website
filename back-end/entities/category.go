package entities

import (
	"database/sql"
	"log"

	"github.com/gin-gonic/gin"
)

type Category struct {
	CategoryID   int    `json:"category_id"`
	CategoryName string `json:"category_name"`
}

func GetAllCategoryNames(c *gin.Context, db *sql.DB) ([]Category, error) {
	rows, err := db.Query("SELECT category_id, category_name FROM category")
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer rows.Close()

	categories := []Category{}
	for rows.Next() {
		var cat Category
		err := rows.Scan(&cat.CategoryID, &cat.CategoryName)
		if err != nil {
			log.Fatal(err)
			return nil, err
		}
		categories = append(categories, cat)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return categories, nil
}
