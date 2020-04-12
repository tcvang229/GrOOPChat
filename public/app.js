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
	+ "Chatter: "
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
    message: $('<p>').html(this.newMsg).text()
    }
    ));
    this.newMsg = '';
    }
    },
    }
});