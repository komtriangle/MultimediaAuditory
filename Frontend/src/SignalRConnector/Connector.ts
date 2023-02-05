import * as signalR from "@microsoft/signalr";
import { Command } from "../Classes/Command";
import { DeviceState } from "../Classes/DeviceState";


class Connector {
    private connection: signalR.HubConnection;
    public events: (onMessageReceived: (state: DeviceState) => void, onConnected: () => void, onDisconnected: () => void) => void;
    public onConnected: () => void;
    static instance: Connector;
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_HUB_ADDRESS ?? "",
                {
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets
                })
            .withAutomaticReconnect()
            .build();
        this.connect();
        this.events = (onMessageReceived, onConnected, onDisconnected) => {
            this.connection.on("deviceChange", (state: DeviceState) => {
                onMessageReceived(state);
            });
            this.onConnected = onConnected;
            this.connection.onclose(error => {
                onDisconnected();
            });
            this.connection.onreconnecting(error => {
                onDisconnected();
            });
            this.connection.onreconnected(connectionId => {
                onConnected();
                this.subscribeForChanges();
            });
        };
    }
    public State = () => {
        return this.connection.state;
    }
    private subscribeForChanges = () => {
        this.connection.send("SubscribeDevicesChanges").then(x => console.log("sent message to subscribe for devices updates"))
    }
    public sendCommand = (command: Command) => {
        this.connection.send("ReceiveCommand", command).then(x => console.log("sent"))
    }
    public static getInstance(): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }

    public async connect() {
        let isConnected = false;
        while (!isConnected) {
            this.connection.start()
                .then(_ => {
                    isConnected = true;
                    this.onConnected();
                    this.subscribeForChanges();
                })
            //.catch(err => console.log(err));
            await new Promise(res => setTimeout(res, 1000));
        }
    }
}
export default Connector.getInstance();