package main

import (
	"fmt"

	"./httpserver"
)

func main() {
	resource, err := Asset("static/templates/index.html")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(resource)

	httpserver.Start()
}
