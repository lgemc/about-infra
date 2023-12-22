package main

import (
	"log"

	"github.com/lgemc/I/compute/go-monorepo/shared/env"
	"github.com/lgemc/I/compute/go-monorepo/shared/kafka"
)

var (
	topic = env.GetString("KAFKA_TOPIC", "rappi-test")
)

func main() {
	consumer := kafka.NewConsumer(topic)

	log.Print("Listening on topic: ", topic)

	consumer.Consume(nil, func(message kafka.Message) error {
		println("incomming message: ", string(message.Value))
		return nil
	})
}
