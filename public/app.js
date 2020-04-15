var first_name = Math.floor((Math.random() * 4));
var last_name = Math.floor(Math.random() * 100);

name_list = ["drudge", "tall-joker", "octavious", "zinger", "blue-chrome", "red-rocs"];
var name = name_list[first_name] + last_name + ":";

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
                        username: name,
                        message: $('<p>').html(this.newMsg).text()
                    })
                );
                this.newMsg = '';
            }
        },
    }
});