import "./MessagesComponent.css"
import {format} from "timeago.js"

export default function MessagesComponent({message, own}) {
    return (
        <div className={own ? "messages own" : "messages"}>
            <div className="messagesTop">
                <img className="messagesImg" src="https://cdn.discordapp.com/attachments/829661320923447326/860355801931579422/unknown.png" alt=""/>
                <p className="messagesText">{message.text}</p>
            </div>
            <div className="messagesBottom">{format(message.createdAt)}</div>
        </div>
    )
}