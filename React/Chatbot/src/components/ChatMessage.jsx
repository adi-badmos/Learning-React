import robotProfileImage from '../assets/robot.png';
import userProfileImage from '../assets/profile-1.jpg';
import './ChatMessage.css';

export function ChatMessage({ message, sender, time }) {
    return (
        <div className={
            sender === 'user'
                ? 'chat-message-user'
                : 'chat-message-robot'
        }>
            {sender === 'robot' && (
                <img
                    src={robotProfileImage}
                    className="chat-message-profile"
                />
            )}
            <div
                className="chat-message-text">
                {message}
                {time && (
                    <div
                        className='samay'>
                        {time}
                    </div>
                )}
            </div>
            {sender === 'user' && (
                <img
                    src={userProfileImage}
                    className="chat-message-profile"
                />
            )}
        </div>
    )
}