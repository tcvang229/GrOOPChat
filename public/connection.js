// localhost:8080 is the server and port combination
// that we will be testing/producing on

var ws = new WebSocket("ws://localhost:8080/ws");

ws.onmessage = function (event) {
    console.log("Message received " + event.data);
}

ws.onopen = function () {
    console.log("Successful connection");
    ws.send(
        JSON.stringify({
            message: "Hello"
        })
    );
}

ws.onclose = function (event) {
    console.log("Socket closed", event);
}

ws.onerror = function (error) {
    console.log("error", error);
}

