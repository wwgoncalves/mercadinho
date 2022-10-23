// Provides some utility functions.
package utils

import (
	"log"
)

// ExitOnError logs the message and exits if an error exists.
func ExitOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}
