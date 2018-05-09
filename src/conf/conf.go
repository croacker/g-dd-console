package conf

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"

	"../commonutils"
)

//Имя файла конфигурации
const fileName = "conf.json"

//Configuration Конфигурация приложения
type Configuration struct {
	AppSettings AppSettings
	KsedAppSettings KsedAppSettings
}

type AppSettings struct {
	Port string
}

type KsedAppSettings struct {
	Addr string
}

var configuration *Configuration

//Get Получить конфигурацию
func Get() *Configuration {
	if configuration == nil {
		config, err := load()
		if err != nil {
			config = makeDefault()
		}
		configuration = config
	}
	return configuration
}

//Загрузить конфигурацию
func load() (*Configuration, error) {
	var err error
	var configuration *Configuration

	dat, err := ioutil.ReadFile(fileName)
	handleError(err)

	err = json.Unmarshal(dat, &configuration)
	handleError(err)

	return configuration, err
}

//Создать конфигурацию поумолчанию
func makeDefault() *Configuration {
	fullFileName := commonutils.CurrentFolder() + "/" + fileName
	fmt.Println("Make default configuration", fullFileName)

	configuration := Configuration{
		AppSettings: AppSettings{
			Port: "8282",
		},
		KsedAppSettings: KsedAppSettings{
			Addr: "http://127.0.0.1:8082/dev",
		},
	}
	b, err := json.Marshal(configuration)
	if err != nil {
		handleError(err)
	}

	ioutil.WriteFile(fullFileName, b, 0777)
	return &configuration
}

//Обработать ошибку
func handleError(err error) {
	if err != nil {
		log.Println(err)
	}
}
