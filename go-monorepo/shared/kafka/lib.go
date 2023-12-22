package kafka

import (
	"context"
	"log"
	"os"
	"os/signal"
	"sync"

	"github.com/IBM/sarama"
	"github.com/lgemc/I/compute/go-monorepo/shared/env"
)

var (
	consumer sarama.Consumer
	producer sarama.SyncProducer

	kafkaURL         = env.GetString("KAFKA_URL", "localhost:9092")
	initOnceConsumer sync.Once
	initOnceProducer sync.Once
)

func getConsumer() sarama.Consumer {
	if consumer != nil {
		return consumer
	}
	initOnceConsumer.Do(func() {
		var err error
		config := sarama.NewConfig()
		config.Consumer.Return.Errors = true
		config.Consumer.Offsets.Initial = sarama.OffsetOldest

		consumer, err = sarama.NewConsumer([]string{kafkaURL}, config)
		if err != nil {
			panic(err)
		}
	})

	return consumer
}

func getProducer() sarama.SyncProducer {
	if producer != nil {
		return producer
	}
	initOnceProducer.Do(func() {
		var err error
		producer, err = sarama.NewSyncProducer([]string{kafkaURL}, nil)
		if err != nil {
			panic(err)
		}
	})

	return producer
}

type Message struct {
	Key   string
	Value []byte
}

type MessageCallback func(Message) error

type Consumer struct {
	topic string
}

type Producer struct {
	topic string
}

func NewProducer(topic string) *Producer {
	return &Producer{topic: topic}
}

func (p *Producer) Produce(ctx context.Context, message Message) error {
	_, _, err := getProducer().SendMessage(&sarama.ProducerMessage{
		Topic: p.topic,
		Key:   sarama.StringEncoder(message.Key),
		Value: sarama.ByteEncoder(message.Value),
	})

	return err
}

func NewConsumer(topic string) *Consumer {
	return &Consumer{topic: topic}
}

func (c *Consumer) Consume(ctx context.Context, callback MessageCallback) {
	partitionConsumer, err := getConsumer().ConsumePartition(c.topic, 0, sarama.OffsetOldest)
	if err != nil {
		log.Fatal("Error creating partition consumer:", err)
	}
	defer func() {
		if err := partitionConsumer.Close(); err != nil {
			log.Fatal("Error closing partition consumer:", err)
		}
	}()

	signals := make(chan os.Signal, 1)
	signal.Notify(signals, os.Interrupt)

	var wg sync.WaitGroup
	wg.Add(1)

	go func() {
		defer wg.Done()
		for {
			select {
			case msg := <-partitionConsumer.Messages():
				if err := callback(Message{Key: string(msg.Key), Value: msg.Value}); err != nil {
					log.Fatal("Error processing message:", err)
				}
			case err := <-partitionConsumer.Errors():
				log.Fatal("Error:", err)
			case <-signals:
				return
			}
		}
	}()

	wg.Wait()
}
