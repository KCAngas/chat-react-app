import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/Chat.css"

export const Chat = (props) => {
    const { room } = props;
    const [ newMessage, setNewMesssage ] = useState("");
    const [ messages, setMessages] = useState([]);

    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(
            messagesRef, 
            where("room", "==", room),
            orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            });
            setMessages(messages);
        });

        return () => unsubscribe();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room
        })

        setNewMesssage("")
    };

    return (
        <div className="chat-app">
            <div className="header">
                <h1> Welcome to: {room.toUpperCase()}</h1>
            </div>
            <div className="messages"> 
                { messages.map((message) => (
                    <div className="message" key={message.id}>
                        <span className="user"> {message.user} </span>
                        {message.text}
                    </div>
                ))} 
            </div>
            <form onSubmit={handleSubmit} className="new-message-form">
                <input 
                    className="new-message-input"
                    placeholder="Type your message here..."
                    onChange={(e) => setNewMesssage(e.target.value)}
                    value={newMessage}
                />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    )
};