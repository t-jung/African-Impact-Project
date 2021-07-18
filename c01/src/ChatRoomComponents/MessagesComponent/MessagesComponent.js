import "./MessagesComponent.css"
import {format} from "timeago.js"

export default function MessagesComponent({message, own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src="https://cdn.discordapp.com/attachments/829661320923447326/860355801931579422/unknown.png" alt=""/>
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}