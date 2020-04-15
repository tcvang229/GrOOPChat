var one = Math.floor((Math.random() * 4));
var two = Math.floor((Math.random() * 4));
var three = Math.floor(Math.random() * 100);

var tall_joker = " tall joker ";
var octavious = " octavious ";
var boarder = " boarder ";
var rainbow_chrome = " blue chrome ";
var fire_rox = " fire rox ";

switch (one) {
    case 0:
        one = lgma;
        break;
    case 1:
        one = octavious;
        break;
    case 2:
        one = boarder;
        break;
    case 3:
        one = rainbow_chrome;
        break;
    case 4:
        one = fire_rox;
        break;
}

switch (two) {
    case 0:
        two = lgma;
        break;
    case 1:
        two = octavious;
        break;
    case 2:
        two = boarder;
        break;
    case 3:
        two = rainbow_chrome;
        break;
    case 4:
        two = fire_rox;
        break;
}

var usernames = one + two + three + ":";

new Vue({
        el: '#app',
        data: {
	    ws: null,
	    newMsg: '', 
	    chatContent: '', 
	    joined: true 
    },
    created: function() {
	    var self = this;
	    this.ws = new WebSocket('ws://' + window.location.host + '/ws');
	    this.ws.addEventListener('message', function(e) {
	        var msg = JSON.parse(e.data);
	        self.chatContent += '<div class="chip">'
            + '</div>'
            + msg.username + " "
	        //+ "Chatter: "
            + emojione.toImage(msg.message) + '<br/>';
            var element = document.getElementById('chat-messages');
            element.scrollTop = element.scrollHeight;
        });
    },

    methods: {
        send: function () {
            if (this.newMsg != '') {
                this.ws.send(
                    JSON.stringify({
                        username: usernames,
                        message: $('<p>').html(this.newMsg).text()
                    })
                );
                this.newMsg = '';
            }
        },
    }
});