package main

import (
	"log"
	"net/http"
	"github.com/gorilla/websocket"
)

// websocket upgrader object
var upgrader = websocket.Upgrader {
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,
}

// connected clients
var clients = make(map[*websocket.Conn]bool)

// broadcast channel
var broadcast = make(chan Message)

// Message object that'll hold our messages
type Message struct {
	Username string `json:"username"`
	Message string `json:"message"`
}

func main() {
	// publicFileServer will be called if client accesses root path -> /
	// will show the public files that we want them to see
	publicFileServer := http.FileServer(http.Dir("../public"))
	http.Handle("/", publicFileServer)

	// websocketHandler will be called if client accesses /ws path
	http.HandleFunc("/ws", handleWebSockets)
	go handleMessages()

	// turn on the server through port 8080
	server := http.ListenAndServe(":8080", nil)
	if server != nil {
		log.Fatal("Error: Failed to start server on port 8080 ", server)
	}
}

// what to do when client accesses the -> /ws path
func handleWebSockets(writer http.ResponseWriter, request *http.Request) {
	// need to check the origin before calling Upgrade()
	upgrader.CheckOrigin = func(request *http.Request) bool {
		return true
	}

	conn, err := upgrader.Upgrade(writer, request, nil)

	if err != nil {
		log.Println(err)
		return
	}

	log.Println("Successful connection to websocket path...")
	defer conn.Close()

	clients[conn] = true

	// CLIENT -> SERVER
	// infinite loop to take in messages
	for {
		var msg Message
		err := conn.ReadJSON(&msg)

		if err!= nil {
			log.Printf("Error in handleWebSockets: %v", err)
			delete(clients, conn)
			break
		} 

		log.Printf("%s\n", msg.Message)
		broadcast <- msg
	}
}

// SERVER -> CLIENTS, the messages that were sent by a client 
func handleMessages() {
	// infinite loop that will be running concurrently
	for {
		msg := <-broadcast
		for client := range clients {
			// write out to each client
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("Error in handleMessages: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}