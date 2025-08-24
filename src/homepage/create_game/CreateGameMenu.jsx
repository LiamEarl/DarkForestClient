import { useState } from "react";
import "./CreateGameMenu.css";
function CreateGameMenu({isOpen, onClose}) {
    const [userList, setUserlist] = useState(["Jaylon", "Liam", "Bryce"]);

    if(!isOpen) return null;

    return (
        <div className="creategame">
            <div className="gamemenu">
                

            <h1>Players:</h1>
            <ul>
                {userList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <button onClick={() => onClose()}>Cancel</button>
            
            </div>
        </div>
    );
}

export default CreateGameMenu;