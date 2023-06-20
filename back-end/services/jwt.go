package services

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateAuthorizedToken(email string) (string, error) {
	// Create a new token object
	token := jwt.New(jwt.SigningMethodHS256)

	// Set the claims (payload) for the token
	claims := token.Claims.(jwt.MapClaims)
	claims["email"] = email
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()
	// Token expiration time (1 day)

	// Set the secret key for signing the token
	secret := []byte("quydeptrai")
	tokenString, err := token.SignedString(secret)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
