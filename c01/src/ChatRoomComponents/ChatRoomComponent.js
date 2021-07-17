import "./ChatRoomComponent.css";
import ConversationsComponent from "./ConversationsComponent/ConversationsComponent";
import MessagesComponent from "./MessagesComponent/MessagesComponent";

export default function ChatRoom() {
    return (
        <div className="chatroom">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="search" className="chatMenuInput"/>
                    <ConversationsComponent/>
                    <ConversationsComponent/>
                    <ConversationsComponent/>
                    <ConversationsComponent/>
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <MessagesComponent/>
                        <MessagesComponent own={true} />
                        <MessagesComponent/>
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="write something..."></textarea>
                        <button className="chatSubmitButton">Send</button>
                    </div>
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