package httpserver

import (
	"../conf"
	"github.com/gin-gonic/gin"
)

//Start запуск http-сервера
func Start() {
	router := gin.Default()
	router.Static("/static", "./static")
	router.LoadHTMLGlob("./static/templates/*")
	router.GET("/", indexEndpoint)
	router.GET("/conf-view", confList)
	router.GET("/api/ksed-config", ksedConfig)

	router.Run(":" + conf.Get().AppSettings.Port)
}
