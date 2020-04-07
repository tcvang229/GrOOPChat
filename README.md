# GrOOP Chat
An application that uses Golang, JavaScript, Html and CSS to build a local chat server & client.

# Requirements to compile and run
In order to compile the source code, please install the Golang Compiler

Two simple ways of running the .go file is to use these commands:
    go run <FILENAME>.go
        -temporarily creates an executable file then runs it directly on the native machine

    go build <FILENAME>.go
        -builds the file to create an executable file
        -the user will have to call upon the file in order to run

# How to run the whole application
Run the .go executable to successfully create a websocket server on your machine
Once the server is up and running, open the client html file. The client's JavaScript will attemp to the Go websocket server that's supposed to be running. If the Go websocket server isn't running, you'll receive a connection error.

## Developers
Jackson Massey
Ryan Lange
Derreck Sengkhammee
Lane Olson
Tswjfwmeng Vang
