import { ChatEngine } from 'react-chat-engine';

import './Messenger.css';

const Messenger = () => {
    return(
        <ChatEngine 
            height = "100vh"
            projectID = "a339b64e-8d05-4cda-b34b-3f20d075ca82"
            userName = "Demo"
            userSecret = "123"
        />
    )
}

export default Messenger;