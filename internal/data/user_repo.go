package data

import (
	"context"
	"strings"
	"sync"

	"example.com/go-kratos-template/internal/biz"
)

type MemoryUserRepo struct {
	mu      sync.Mutex
	byEmail map[string]biz.User
}

func NewMemoryUserRepo() *MemoryUserRepo {
	return &MemoryUserRepo{byEmail: map[string]biz.User{}}
}

func (repo *MemoryUserRepo) Save(_ context.Context, user biz.User) error {
	repo.mu.Lock()
	defer repo.mu.Unlock()
	repo.byEmail[user.Email] = user
	return nil
}

func (repo *MemoryUserRepo) FindByEmail(_ context.Context, email string) (biz.User, bool, error) {
	repo.mu.Lock()
	defer repo.mu.Unlock()
	user, ok := repo.byEmail[strings.ToLower(strings.TrimSpace(email))]
	return user, ok, nil
}
