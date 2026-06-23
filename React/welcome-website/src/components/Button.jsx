import './Button.css';

export function Button({ text, onClick }) {
    return (
        <>
            <button onClick={onClick} className="button">{text}</button>
        </>
    );
}