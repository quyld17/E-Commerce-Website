package jwt

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

func Generate(email string) (string, error) {
	err := godotenv.Load(".env")
	if err != nil {
		return "", err
	}
	// Create a new token object
	token := jwt.New(jwt.SigningMethodHS256)

	// Set the claims (payload) for the token
	claims := token.Claims.(jwt.MapClaims)
	claims["email"] = email
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()
	// Token expiration time (3 days)

	// Set the secret key for signing the token
	secret := []byte(os.Getenv("JWT_SECRET_KEY"))
	tokenString, err := token.SignedString(secret)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func GetToken(c echo.Context) string {
	token := c.Request().Header.Get("Authorization")
	return token
}

func GetClaims(token *jwt.Token, key string) string {
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return ""
	}
	value, ok := claims[key].(string)
	if !ok {
		return ""
	}
	return value
}
