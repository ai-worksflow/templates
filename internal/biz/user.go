package biz

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"
)

var ErrUserAlreadyExists = errors.New("user already exists")

type User struct {
	ID          string
	Email       string
	DisplayName string
	CreatedAt   time.Time
}

type UserRepo interface {
	Save(context.Context, User) error
	FindByEmail(context.Context, string) (User, bool, error)
}

type UserUsecase struct {
	repo UserRepo
}

func NewUserUsecase(repo UserRepo) *UserUsecase {
	return &UserUsecase{repo: repo}
}

func (uc *UserUsecase) Register(ctx context.Context, email string, displayName string) (User, error) {
	if _, ok, err := uc.repo.FindByEmail(ctx, email); err != nil {
		return User{}, err
	} else if ok {
		return User{}, ErrUserAlreadyExists
	}
	email = strings.ToLower(strings.TrimSpace(email))
	displayName = strings.TrimSpace(displayName)
	if !strings.Contains(email, "@") || displayName == "" {
		return User{}, errors.New("invalid user")
	}
	user := User{
		ID:          fmt.Sprintf("usr_%d", time.Now().UnixNano()),
		Email:       email,
		DisplayName: displayName,
		CreatedAt:   time.Now().UTC(),
	}
	return user, uc.repo.Save(ctx, user)
}
