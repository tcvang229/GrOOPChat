// localhost:8080 is the server and port combination
// that we will be testing/producing on

var ws = new WebSocket("ws://localhost:8080/ws");

ws.onopen = function () {
    console.log("Successful connection");
    ws.send("Hello, this my message")
}

ws.onclose = function (event) {
    console.log("Socket closed", event);
}

ws.onerror = function (error) {
    console.log("error", error);
}

