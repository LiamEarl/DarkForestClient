import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

export default function WebSocketConnect() {
    const stompClient = useRef(null);

    useEffect(() => {
        const socket = new SockJS("https://localhost:8443/ws");
        stompClient.current = over(socket);
        stompClient.current.connect({}, () => {
            
        });

    }, []);


}