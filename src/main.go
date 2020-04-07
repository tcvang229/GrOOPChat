package main

import (
	"log"
	"net/http"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader {
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,
}

func main() {
	http.HandleFunc("/ws", websocketHandler)
	http.ListenAndServe(":8080", nil)
}

func websocketHandler(writer http.ResponseWriter, request *http.Request) {
	// need to check the origin before calling Upgrade()
	upgrader.CheckOrigin = func(request *http.Request) bool {
		return true
	}

	conn, err := upgrader.Upgrade(writer, request, nil)
	if err != nil {
		log.Println(err)
		return
	}

	log.Println("Client successfully connected...")

	for {
		messageType, p, err := conn.ReadMessage()
		if err!= nil {
			log.Println(err)
			return
		} 

		log.Println(string(p))

		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
}