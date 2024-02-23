"use strict";

//const { signalR } = require("./signalr/dist/browser/signalr");

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messageList").append(li);

    li.textContent = `${user} says ${message}`;
});
connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
    console.log("connected!")
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    console.log(user + message);
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });

    event.preventDefault();
});


