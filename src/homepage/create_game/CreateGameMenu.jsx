import { useEffect, useState } from "react";
import "./CreateGameMenu.css";
import { useWebSocket } from "../../contexts/WebSocketContext";
import WebSocketWrapper from "../../WebSocket";
import { useUser } from "../../contexts/UserContext";

function CreateGameMenu({isOpen, onClose}) {
    const {webSocket, setWebSocket} = useWebSocket();
    const [userList, setUserList] = useState([]);
    const [gameCode, setGameCode] = useState("");
    const {user, setUser} = useUser();

    const generateCode = (numChars) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var code = "";
        for(var i = 0; i < numChars; i++) {
            code = code.concat(chars.charAt(Math.floor(Math.random() * chars.length)));
        }
        return code;
    };

    useEffect(() => {
        setGameCode(generateCode(7));
    }, []);

    useEffect(() => {
        if(!isOpen || !gameCode) return;

        if(webSocket) {
            webSocket.disconnect();
            setWebSocket(null);
        }

        const ws = new WebSocketWrapper("wss://localhost:8888/ws");

        ws.connect(() => {
            setUserList([user.username]);
            ws.subscribe(`/topic/lobby/${gameCode}`, (msg) => {
                setUserList([]);
                setUserList(msg.players.map(player => player.username));
            });
            ws.send(`/app/createGame/${gameCode}`);
        });

        setWebSocket(ws);
    }, [isOpen]);

    if(!isOpen) return null;

    return (
        <div className="creategame">
            <div className="gamemenu">
                <div className="code">
                    <h1>GameCode:</h1>
                    <p id="gamecode">{gameCode}</p>
                </div>
            <h1>Players:</h1>
            <ul>
                {userList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <button onClick={() => {
                setGameCode(generateCode(7));
                if(webSocket) {
                    webSocket.disconnect();
                    setWebSocket(null);
                }
                onClose();
            }}>Exit</button>
            
            </div>
        </div>
    );
}

export default CreateGameMenu;