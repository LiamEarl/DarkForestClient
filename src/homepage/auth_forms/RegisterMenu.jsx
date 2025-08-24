import { useState } from "react";

function RegisterMenu({ isOpen, onClose, onRegister, onLogin}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://localhost:8888/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: "include"
            });
            
            if(!response.ok) throw new Error("Failed. Username Was Probably In Use");
            onRegister();
            setUsername("");
            setPassword("");
            onClose();
        } catch (err) {
            setError(err.message);
            setUsername("");
            setPassword("");
        }
    };
    
    if(!isOpen) return null;

    return (
        <div className="authform">
            <form onSubmit={handleSubmit}>

                <h1>Register</h1>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <input
                    type="text"
                    placeholder="Username"
                    maxLength={14}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Please use a unique password!</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    maxLength={20}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
                <button type="button" 
                    onClick={() => {
                        setUsername("");
                        setPassword("");
                        onClose();
                    }}>
                    Cancel
                </button>
                <label>Already have an account?</label>
                <button type="button" 
                    onClick={() => {
                        setUsername("");
                        setPassword("");
                        onClose();
                        onLogin();
                    }}>
                    Login Instead
                </button>
        </form>
        </div>
    );
}

export default RegisterMenu;