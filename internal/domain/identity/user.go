package identity

import (
	"errors"
	"strings"
	"time"
)

var ErrInvalidUser = errors.New("invalid user")

type User struct {
	ID          string
	Email       string
	DisplayName string
	CreatedAt   time.Time
}

func NewUser(id, email, displayName string, now time.Time) (User, error) {
	email = strings.ToLower(strings.TrimSpace(email))
	displayName = strings.TrimSpace(displayName)
	if id == "" || email == "" || !strings.Contains(email, "@") || displayName == "" {
		return User{}, ErrInvalidUser
	}
	return User{ID: id, Email: email, DisplayName: displayName, CreatedAt: now.UTC()}, nil
}
