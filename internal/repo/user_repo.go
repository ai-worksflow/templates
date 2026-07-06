package repo

import (
	"context"
	"strings"
	"sync"

	"example.com/go-gozero-template/internal/domain/identity"
)

type UserRepository interface {
	Save(context.Context, identity.User) error
	FindByEmail(context.Context, string) (identity.User, bool, error)
}

type MemoryUserRepository struct {
	mu      sync.Mutex
	byEmail map[string]identity.User
}

func NewMemoryUserRepository() *MemoryUserRepository {
	return &MemoryUserRepository{byEmail: map[string]identity.User{}}
}

func (r *MemoryUserRepository) Save(_ context.Context, user identity.User) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.byEmail[user.Email] = user
	return nil
}

func (r *MemoryUserRepository) FindByEmail(_ context.Context, email string) (identity.User, bool, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	user, ok := r.byEmail[strings.ToLower(strings.TrimSpace(email))]
	return user, ok, nil
}
