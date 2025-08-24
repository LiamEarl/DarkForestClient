import { Client } from "@stomp/stompjs";

export default class WebSocketWrapper {
    constructor(url) {
        this.client = new Client({
            brokerURL: url,
            connectHeaders: {}, 
            reconnectDelay: 5000,
            debug: (str) => console.log(str),
            webSocketFactory: () => {
                return new WebSocket(url, [], {
                    withCredentials: true   
                });
            }
        });
        this.subscriptions = {};
    }

    connect(onSocketConnect) {
        this.client.onConnect = (frame) => {
            console.log('Connected: ' + frame);
            onSocketConnect();
        };

        this.client.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
        };

        this.client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        this.client.activate();
    }

    disconnect() {
        this.client.deactivate();
        console.log("Disconnected from STOMP broker");
    }

    subscribe(destination, callback) {
        if (!this.client.active) {
            console.warn("WebSocket not connected yet");
            return;
        }
        const subscription = this.client.subscribe(destination, (message) => {
            callback(JSON.parse(message.body));
        });
        this.subscriptions[destination] = subscription;
    }

    unsubscribeAll() {
        Object.values(this.subscriptions).forEach(sub => sub.unsubscribe());
        this.subscriptions = {};
    }

    unsubscribe(destination) {
        if (this.subscriptions[destination]) {
            this.subscriptions[destination].unsubscribe();
            delete this.subscriptions[destination];
            console.log(`Unsubscribed from ${destination}`);
        }
    }

    isActive() {
        return this.client.active;
    }

    send(destination, body) {
        if (!this.client.active) {
            console.warn("Cannot send, WebSocket not connected yet");
            return;
        }
        this.client.publish({
            destination: destination,
            body: JSON.stringify(body),
        });
    }
}
