import { useEffect, useState } from "react";
import "./GameFormStyle.css";
import { useWebSocket } from "../../contexts/WebSocketContext";
import WebSocketWrapper from "../../WebSocket";
function JoinGameMenu({isOpen, onClose}) {
    const {webSocket, setWebSocket} = useWebSocket();
    const [userList, setUserList] = useState([]);
    var [gameCode, setGameCode] = useState("");

    const joinGame = () => {
        if(gameCode.length != 7) return;
    
        const ws = new WebSocketWrapper("wss://localhost:8888/ws");

        ws.connect(() => {
            
            ws.subscribe(`/topic/lobby/${gameCode}`, (msg) => {
                setUserList(msg.map(user => user.username));
            });
            ws.send(`/app/joinGame/${gameCode}`, null);
        });
        setWebSocket(ws);
    }

    const handleChange = (e) => {
        setGameCode(e.target.value.toUpperCase());
    };

    

    if(!isOpen) return null;

    return (
        <div className="gameform">
            
            <div className="gamemenu">
                <h1>Join Game</h1>
                <input 
                    placeholder="ABC123" 
                    onChange={handleChange} 
                    maxLength={7} 
                    type="text" 
                    value={gameCode}
                ></input>
                <button onClick={joinGame}>Join</button>
                <h1>Players:</h1>   
                <ul>
                    {userList.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul> 
                <button onClick={() => onClose()}>Exit</button>
                
            </div>
        </div>
    );
}

export default JoinGameMenu;