import { Button } from "./Button";
import { Input } from "./Input";
import { PasswordInput } from "./PasswordInput";

export function LoginForm() {
    return (
        <>
            <Input placeholder="Email" type="text" />
            <PasswordInput placeholder="Password" />
            <Button text="Login" />
            <Button text="Sign up" />
        </>
    );
}