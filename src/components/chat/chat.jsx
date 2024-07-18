// src/components/Chat.js
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3000", {
    query: { userId: JSON.parse(localStorage.getItem("user")).id },
});

function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [typing, setTyping] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axios.get(`http://localhost:3000/chat/messages/${user.id}/2`);
            setMessages(response.data);
        };

        fetchMessages();

        socket.on("receiveMessage", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        socket.on("typing", (data) => {
            if (data.sender !== user.id) setTyping(true);
            setTimeout(() => setTyping(false), 1000);
        });

        socket.on("userStatus", (data) => {
            // Handle user online/offline status
        });

        return () => {
            socket.off("receiveMessage");
            socket.off("typing");
            socket.off("userStatus");
        };
    }, [user.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("sendMessage", { sender: user.id, receiver: 2, content: message });
        setMessage("");
    };

    const handleTyping = () => {
        socket.emit("typing", { sender: user.id, receiver: 2 });
    };

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((msg) => (
                    <div key={msg.id}>
                        <strong>{msg.sender.username}: </strong> {msg.content}
                    </div>
                ))}
                {typing && <div>Typing...</div>}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleTyping}
                    placeholder="Type a message"
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;
