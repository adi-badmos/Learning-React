import dayjs from 'dayjs';
import { useState } from "react";
import { Chatbot } from "supersimpledev";
import './ChatInput.css';
import loadingSpinnerImage from '../assets/loading-spinner.gif';

export function ChatInput({ chatMessages, setChatMessages }) {
    const [ inputText, setInputText ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const time = dayjs().format('h:mma');

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
                id: crypto.randomUUID(),
                time: time
            }, {
                message: <img src={loadingSpinnerImage} className="loading-spinner" />,
                sender: 'robot',
                id: crypto.randomUUID(),
            }
        ]);

        const response = await Chatbot.getResponseAsync(temp);
        setChatMessages([
            ...chatMessages, // spread operator
            {
                message: temp,
                sender: 'user',
                id: crypto.randomUUID(),
                time: time
            }, {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID(),
                time: time
            }
        ]);

        setIsLoading(false);
    }

    function clearChat() {
        setChatMessages([]);
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
            <button
                className='clear-button'
                onClick={clearChat}
            >Clear</button>
        </div>
    )
}