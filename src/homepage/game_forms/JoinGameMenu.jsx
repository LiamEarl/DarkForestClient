import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./GameFormStyle.css";
import { useWebSocket } from "../../contexts/WebSocketContext";
import WebSocketWrapper from "../../WebSocket";
import AppServerDetails from "~/assets/AppServerDetails.json" with {type: "json"};
import { useUser } from "~/contexts/UserContext";

function JoinGameMenu({isOpen, onClose}) {
    let navigate = useNavigate();
    const {webSocket, setWebSocket} = useWebSocket();
    const [userList, setUserList] = useState([]);
    const [gameCode, setGameCode] = useState("");
    const {user, setUser} = useUser();

    const joinGame = () => {
        if(gameCode.length != 7) return;
        if(webSocket) {
            webSocket.disconnect();
            setWebSocket(null);
        }
        const ws = new WebSocketWrapper(AppServerDetails.wss_url.concat("/ws"));

        ws.connect(() => {
            ws.subscribe(`/topic/lobby/${gameCode}`, (msg) => {
                setUserList([]);
                setUserList(msg.players.map(player => player));

                if(msg.started) {
                    onClose();
                    navigate("/game");
                }
            });
            ws.send(`/app/joinGame/${gameCode}`, null);
        });
        setWebSocket(ws);
    };

    const handleChange = (e) => {
        setGameCode(e.target.value.toUpperCase());
    };

    useEffect(() => {
        if(!user) return;

        if(userList.length == 0) {
            console.log(userList.length);
            
            setUserList([user.username]);
        }
    }, [userList, user]);
    

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