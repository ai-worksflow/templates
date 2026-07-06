package svc

import (
	"example.com/go-gozero-template/internal/config"
	"example.com/go-gozero-template/internal/repo"
)

type ServiceContext struct {
	Config config.Config
	Users  repo.UserRepository
}

func NewServiceContext(c config.Config) *ServiceContext {
	return &ServiceContext{
		Config: c,
		Users:  repo.NewMemoryUserRepository(),
	}
}
