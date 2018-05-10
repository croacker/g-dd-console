package httpserver

import "github.com/gin-gonic/gin"

func ksedConfig(context *gin.Context) {
	context.Header("Access-Control-Allow-Origin", "*")
	context.Header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers")
	context.JSON(200, gin.H{
		"ksedconfig": getConfig().KsedAppSettings,
	})
}
