import { ChatMessage } from './ChatMessage';
import { useAutoScroll } from './useAutoScroll';
import './ChatMessages.css';

export function ChatMessages({ chatMessages }) {
    const chatMessageRef = useAutoScroll([chatMessages]);
    
    return (
        <div
            className="chat-messages-container"
            ref={chatMessageRef}
        >
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id}
                    />
                );
            })}
        </div>
    )
}