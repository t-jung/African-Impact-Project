import "./ChatRoomComponent.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ConversationsComponent from "./ConversationsComponent/ConversationsComponent";
import MessagesComponent from "./MessagesComponent/MessagesComponent";
import { io } from "socket.io-client";
import jwt_decode from "jwt-decode";

export default function ChatRoom() {
    let token = sessionStorage.getItem('token');

    const userId = jwt_decode(token).user.id
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const scrollRef = useRef();

    /* Set up socket connection to receive message */
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    /* set new messages */
    useEffect (() => {
        arrivalMessage && currentChat?.users.includes(arrivalMessage.sender) && setMessages(prev => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat])

    /* Set up socket connection to users */
    useEffect (() => {
        socket.current.emit("addUser", userId);
        socket.current.on("getUsers", users => {
            console.log(users);
        })
    }, [userId])

    /* Gets conversations for current user */
    useEffect (() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/chatroom/conversations/"+ userId);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
            
        }
        getConversations();
    }, [userId])

    /* Gets messages for current conversation */
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/chatroom/messages/"+currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat])

    /* Called upon sending a message. Creates a new message and updates the list of current messages. */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: userId,
            text: newMessage,
            conversationId: currentChat._id
        };

        const receiverId = currentChat.users.find(u => u !== userId);

        socket.current.emit("sendMessage", {
            senderId: userId,
            receiverId,
            text: newMessage
        })

        try {
            const res = await axios.post("http://localhost:5000/api/chatroom/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    }

    /* Auto scrolls */
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages])


    return (
        <div className="chatroom">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="search" className="chatMenuInput"/>
                    {conversations.map((c) => (
                        <div onClick={() => setCurrentChat(c)}>
                        <ConversationsComponent conversation={c} currentUserId={userId}/>
                        </div>
                    ))}
                    
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    { currentChat ? 
                    <>
                    <div className="chatBoxTop">
                        {messages.map((m) => (
                            <div ref={scrollRef}>
                                <MessagesComponent message={m} own={m.sender === userId} />
                            </div>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="write something..." onChange={(e) =>setNewMessage(e.target.value)} value={newMessage}></textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                    </div></> : <span className="noConversation">Open a conversation to start a chat</span>}
                </div>
                
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    online
                </div>
            </div>
        </div>
    )
}