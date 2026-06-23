import { useState } from "react";
import { Chatbot } from "supersimpledev";
import './ChatInput.css';
import loadingSpinnerImage from '../assets/loading-spinner.gif';

export function ChatInput({ chatMessages, setChatMessages }) {
    const [ inputText, setInputText ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    function handleKeyDown(event) {
        if(event.key === 'Enter') {
            sendMessage();
        }

        if(event.key === 'Escape') {
            setInputText('');
        }
    }

    async function sendMessage() {
        if(isLoading || inputText === '') {
            return;
        }

        const temp = inputText;

        setInputText('');
        setIsLoading(true);

        setChatMessages([
            ...chatMessages, // spread operator
            {
                message: temp,
                sender: 'user',
                id: crypto.randomUUID()
            }, {
                message: <img src={loadingSpinnerImage} className="loading-spinner" />,
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);

        const response = await Chatbot.getResponseAsync(temp);
        setChatMessages([
            ...chatMessages, // spread operator
            {
                message: temp,
                sender: 'user',
                id: crypto.randomUUID()
            }, {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);

        setIsLoading(false);
    }

    return (
        <div className="chat-input-container">
            <input
                className="chat-input"
                size="30"
                placeholder="Send a message to Chatbot"
                onChange={saveInputText}
                value={inputText}
                onKeyDown={handleKeyDown}
            />
            <button
                className="send-button"
                onClick={sendMessage}
            >Send</button>
        </div>
    )
}