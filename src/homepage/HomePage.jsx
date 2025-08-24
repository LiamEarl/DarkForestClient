import "./HomePage.css";
import { useState, useEffect } from 'react';
import { useUser } from "../contexts/UserContext";
import Menu1 from '../assets/websiteAssets/Menu1.jpg';
import Menu2 from '../assets/websiteAssets/Menu2.jpg';
import Menu3 from '../assets/websiteAssets/Menu3.jpg';
import Menu4 from '../assets/websiteAssets/Menu4.jpg';
import Menu5 from '../assets/websiteAssets/Menu5.jpg';
import Menu6 from '../assets/websiteAssets/Menu6.jpg';
import Menu7 from '../assets/websiteAssets/Menu7.jpg';
import LoggedOut from '../assets/websiteAssets/LoggedOut.png';
import LoggedIn from '../assets/websiteAssets/LoggedIn.png';
import LogInMenu from "./auth_forms/LogInMenu";
import RegisterMenu from "./auth_forms/RegisterMenu";
import CreateGameMenu from "./create_game/CreateGameMenu";
import JoinGameMenu from "./join_game/JoinGameMenu";

function HomePage() {
    const {user, setUser} = useUser();
    
    const menuImages = [Menu1, Menu2, Menu3, Menu4, Menu5, Menu6, Menu7];
    const comments = [
        "The best thing since sliced bread!",
        "Now with enriched Uranium!",
        "13.7 Billion years in development!",
        "Enjoy the lag :}",
        "I smell WAR.",
        "We take no responsibility for any war crimes.",
        "WARNING: Game lies within.",
        "Peace is never a good option.",
        "Definitely not inspired by Stellaris.",
        "Loading a clever comment..."
    ];
    const locations = ["Earth", "Ceres", "Venus", "Mercury", "Luna", "Ganymede", "Titan", "Enceladus", "Proxima Centauri b", "Ross 128 b", "Saturn's Pride Station"];

    const [accountButtonName, setAccountButtonName] = useState("");
    const [bgImg, setBgImg] = useState(null);
    const [comment, setComment] = useState("");
    const [location, setLocation] = useState("");
    const [accountStatus, setAccountStatus] = useState("");
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showCreateGame, setShowCreateGame] = useState(false);
    const [showJoinGame, setShowJoinGame] = useState(false);
    const [displayedName, setDisplayedName] = useState("");

    const getLoggedInStatus = async (e) => {
        try {
            const response = await fetch("https://localhost:8888/api/users/findme", {
                method: "GET",
                credentials: "include"
            });
            if(!response.ok) throw new Error("Not Logged In / Login Expired");
            const userData = await response.json();
            setUser(userData);
        } catch (err) {
            console.log(err);
            setShowLogin(true);
        }
    };

    const logout = async () => {
        try {
            const username = user.username;
            const id = user.id;

            const response = await fetch("https://localhost:8888/api/users/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, id }),
                credentials: "include"
            });
            if(!response.ok) throw new Error("Logout Failed");
        } catch (err) {
            console.log("Logout failed. Possibly a faulty connection to the server?")
        }
    };

    const handleAccountToggle = () => {
        if(user == null) {
            setShowLogin(true);
        }else {
            logout();
            setUser(null);
        }
    };

    const hideAllWindows = () => {
        setShowCreateGame(false);
        setShowRegister(false);
        setShowLogin(false);
        setShowJoinGame(false);
    }

    useEffect(() => {
        if (!user) {
            setAccountStatus("Logged Out");
            setAccountButtonName("Log In");
            setDisplayedName("");
        } else {
            setAccountStatus("Logged In, ");
            setAccountButtonName("Log Out");
            setDisplayedName(user.username);
        }
    }, [user]);  

    useEffect(() => {
        getLoggedInStatus();
        setBgImg(menuImages[Math.floor(Math.random() * menuImages.length)]);
        setComment(comments[Math.floor(Math.random() * comments.length)]);
        setLocation(locations[Math.floor(Math.random() * locations.length)]);
    }, []);

    return (
        <>
        <div className='homepage' >
            <div className="header">
                <h1 id="title">Dark Forest</h1>
                <p id="comment">{comment}</p>
                {/* <p className="time">5:34PM {location} UST 1/16/2159</p> */}
                
            </div>
            <div className="mainmenu"> 

                <div className="account">
                    <p id="accountstatus">{accountStatus}<span className="displayedname">{displayedName}</span></p>
                    <button onClick={handleAccountToggle}>{accountButtonName}</button>
                </div>

                <button className="gamecreation" onClick={() => {
                    if(!user) {
                        setShowLogin(true);
                        return;
                    }
                    setShowCreateGame(!showCreateGame);
                }}>Create Game</button>

                <button className="gamecreation" onClick={() => {
                    if(!user) {
                        setShowLogin(true);
                        return;
                    }
                    setShowJoinGame(!showJoinGame);
                }}>Join Game</button>

                
            </div>
        </div>
        
        <LogInMenu
                    isOpen = {showLogin}
                    onClose = {() => setShowLogin(false)}
                    onLogin = {(data) => {
                        setUser(data);
                    }}
                    onRegister={
                        () => {
                            hideAllWindows();
                            setShowRegister(true);
                        }
                    }
                />
        <RegisterMenu
            isOpen = {showRegister}
            onClose = {() => setShowRegister(false)}
            onRegister = {() => setShowLogin(true)}
            onLogin = {
                () => {
                    hideAllWindows();
                    setShowLogin(true);
                }
            }
        />
        <CreateGameMenu
            isOpen = {showCreateGame}
            onClose = {() => setShowCreateGame(false)}
        />
        <JoinGameMenu
            isOpen = {showJoinGame}
            onClose = {() => setShowJoinGame(false)}
        />
        </>
    );
}
export default HomePage;