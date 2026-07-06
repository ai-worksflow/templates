package main

import (
	"flag"
	"fmt"

	"example.com/go-gozero-template/internal/config"
	"example.com/go-gozero-template/internal/handler"
	"example.com/go-gozero-template/internal/svc"
	"github.com/zeromicro/go-zero/core/conf"
	"github.com/zeromicro/go-zero/rest"
)

var configFile = flag.String("f", "etc/backend.yaml", "the config file")

func main() {
	flag.Parse()

	var c config.Config
	conf.MustLoad(*configFile, &c)

	server := rest.MustNewServer(c.RestConf)
	defer server.Stop()

	ctx := svc.NewServiceContext(c)
	handler.RegisterHandlers(server, ctx)

	fmt.Printf("starting server at %s:%d...\n", c.Host, c.Port)
	server.Start()
}
