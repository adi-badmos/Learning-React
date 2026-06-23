import { useState } from "react";
import { Button } from "./Button";
import './Input.css';

export function PasswordInput({ placeholder }) {
    const [ showPassword, setShowPassword] = useState(false);

    function changeType() {
        setShowPassword(prev => !prev);
    }

    return (
        <div>
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                className="input"
            />
            <Button 
                onClick={changeType}
                text={showPassword ? 'Hide' : 'Show'}
            />
        </div>
    );
}