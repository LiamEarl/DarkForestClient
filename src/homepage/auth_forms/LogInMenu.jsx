import { useState } from "react";
import "./FormStyles.css";
function LogInMenu({ isOpen, onClose, onLogin, onRegister}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://localhost:8443/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: "include"
            });
            if(!response.ok) throw new Error("Login Unsuccessful.");
            const data = await response.json();
            onLogin(data);
            setUsername("");
            setPassword("");
            onClose();
        } catch (err) {
            setUsername("");
            setPassword("");
            setError(err.message);
        }
    };
    
    if(!isOpen) return null;

    return (
        <div className="authform">
            <form onSubmit={handleSubmit}>

                <h1>Login</h1>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <button type="button" 
                    onClick={() => {
                        setUsername("");
                        setPassword("");
                        onClose();
                    }}>
                    Cancel
                </button>
                <label>Don't haven an account?</label>
                <button type="button" 
                    onClick={() => {
                        setUsername("");
                        setPassword("");
                        onClose();
                        onRegister();
                    }}>
                    Register Instead
                </button>
        </form>
        </div>
    );
}

export default LogInMenu;