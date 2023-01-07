import { ConnectionStatuses } from "../../Consts/ConnectionStatuses";
import IDeviceState from "./IDeviceState";

export default interface IStore{
    devices: IDeviceState[],
    Connection:{
        status: ConnectionStatuses
    }
}