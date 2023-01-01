import { DeviceState } from "../Models/DeviceState";
import IDeviceState from "./Interfaces/IDeviceState";
import { store  } from "./store";

export default function getUpdatedState(state: DeviceState){
    const allDevices: IDeviceState[]= store.getState().devices;
    const deviceOldState = getDevice(state.deviceId, allDevices);

    if(deviceOldState == undefined){
        return allDevices;
    }

    if(state.deviceId === "0" || state.deviceId === "1"){
        if(state.controlName === 'on-off')
         {
          const newValue = state.value === "on" ? true : false
          const deviceNewState = {...deviceOldState, isOn: newValue};
          const newDevicesStates = setNewDevice(deviceNewState, allDevices);
          return newDevicesStates;
         }
    }
    return allDevices;
}


function setNewDevice(deviceState: IDeviceState, allDevices: IDeviceState[]){
    console.log("1 ", allDevices);
     const a =  allDevices.map(
        (device: IDeviceState) => device.id === deviceState.id ? {...deviceState} : {...device});
    console.log("2 ", a);
    return a;

        
}

function getDevice(deviceId: string, allDevices: IDeviceState[]){
    return allDevices.find(d => d.id == deviceId);
}