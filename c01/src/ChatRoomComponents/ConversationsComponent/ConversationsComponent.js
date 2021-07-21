import { useEffect, useState } from "react";
import axios from "axios";
import "./ConversationsComponent.css";

export default function ConversationsComponent({conversation, currentUserId}) {

    const [user, setUser] = useState(null)

    useEffect (() => {
        const friendId = conversation.users.find(m => m !== currentUserId);

        const getUser = async () => {
            try {
                const res = await axios("http://localhost:5000/api/users/getUserById/" + friendId);
                console.log(res);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUserId, conversation])

    return (
        <div className="conversation">
            <imag className="conversationImg" src="https://cdn.discordapp.com/attachments/829661320923447326/860355801931579422/unknown.png" alt=""/>
            <span className="conversationName">{user?.firstName}</span>
        </div>
    )
}
