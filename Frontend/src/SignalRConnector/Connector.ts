import * as signalR from "@microsoft/signalr";
import { Command } from "../Models/Command";
import { DeviceState } from "../Models/DeviceState";


class Connector {
    private connection: signalR.HubConnection;
    public events: (onMessageReceived: (state: DeviceState) => void) => void;
    static instance: Connector;
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_HUB_ADDRESS ?? "")
            .withAutomaticReconnect()
            .build();
        this.connection.start().catch(err => document.write(err));
        this.events = (onMessageReceived) => {
        this.connection.on("ChangesHandler", (state: DeviceState) => {
            onMessageReceived(state);
        });
        };
    }
    public subscribeForChanges = () =>{
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
}
export default Connector.getInstance();