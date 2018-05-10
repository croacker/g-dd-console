package main

import (
	"fmt"
	"./httpserver"
	"./resources"
)

func main() {
	resource, err := resources.Asset("static/templates/index.html")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(resource)

	httpserver.Start()
}
