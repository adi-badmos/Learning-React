import './Input.css';

export function Input({ placeholder, type }) {
    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                className="input"
            />
        </div>
    );
}