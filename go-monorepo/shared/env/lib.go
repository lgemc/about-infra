package env

import "os"

func GetString(key string, _default string) string {
	value := os.Getenv(key)
	if value == "" {
		return _default
	}

	return value
}
