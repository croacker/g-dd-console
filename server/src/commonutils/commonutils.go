package commonutils

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
)

//Текущий каталог
func CurrentFolder() string {
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		log.Fatal(err)
	}
	return dir
}

func ToMoneyString(v int) string {
	floatMoney := float64(v) / 100
	return fmt.Sprintf(fmt.Sprintf("%%.%df", 2), floatMoney)
}

func MkDirIfNotExists(path string) {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		os.MkdirAll(path, 0777)
	}
}

func IsDir(path string) bool {
	fi, err := os.Stat(path)
	if err != nil {
		fmt.Println(err)
	}
	mode := fi.Mode()
	return mode.IsDir()
}
