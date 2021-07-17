import "./MessagesComponent.css"

export default function MessagesComponent({own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src="https://cdn.discordapp.com/attachments/829661320923447326/860355801931579422/unknown.png" alt=""/>
                <p className="messageText">hello this is a message</p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    )
}