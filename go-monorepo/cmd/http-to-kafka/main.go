package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/lgemc/I/compute/go-monorepo/shared/env"
	"github.com/lgemc/I/compute/go-monorepo/shared/kafka"
)

const defaultPort = "8383"

var (
	topic    = env.GetString("KAFKA_TOPIC", "rappi-test")
	producer = kafka.NewProducer(topic)
)

func main() {
	logger := log.New(os.Stdout, "", 0)

	hs := setup(logger)

	logger.Printf("Listening on http://0.0.0.0%s\n", hs.Addr)

	hs.ListenAndServe()

}

func setup(logger *log.Logger) *http.Server {
	return &http.Server{
		Addr:         getAddr(),
		Handler:      newServer(logWith(logger)),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}
}

func getAddr() string {
	if port := os.Getenv("PORT"); port != "" {
		return ":" + port
	}

	return fmt.Sprintf(":%s", defaultPort)
}

func newServer(options ...Option) *Server {
	s := &Server{logger: log.New(ioutil.Discard, "", 0)}

	for _, o := range options {
		o(s)
	}

	s.mux = http.NewServeMux()
	s.mux.HandleFunc("/", s.index)

	return s
}

type Option func(*Server)

func logWith(logger *log.Logger) Option {
	return func(s *Server) {
		s.logger = logger
	}
}

type Server struct {
	mux    *http.ServeMux
	logger *log.Logger
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet && r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	s.log("%s %s", r.Method, r.URL.Path)

	s.mux.ServeHTTP(w, r)
}

func (s *Server) log(format string, v ...interface{}) {
	s.logger.Printf(format+"\n", v...)
}

type Message struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

func (s *Server) index(w http.ResponseWriter, r *http.Request) {
	body := r.Body
	defer body.Close()

	b, err := io.ReadAll(body)
	if err != nil {
		s.log("error reading body: %v", err)

		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	s.log("received request: %s", string(b))

	message := Message{}

	if err := json.Unmarshal(b, &message); err != nil {
		s.log("error unmarshaling message: %v", err)

		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if err := producer.Produce(r.Context(), kafka.Message{
		Key:   message.Key,
		Value: []byte(message.Value),
	}); err != nil {
		s.log("error producing message: %v", err)

		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write([]byte("received request"))
}
