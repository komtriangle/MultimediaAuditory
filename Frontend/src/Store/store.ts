import { DeviceTypes } from '../Consts/DeviceTypes';
import IStore from './Interfaces/IStore'
import lamp from '../Content/Images/lamp.png';
import powerSocket from '../Content/Images/output-onlinepngtools.png';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { ConnectionStatuses } from '../Consts/ConnectionStatuses';


const setDevices = "SET-DEVICES";
const setConnectionStatus = "SET-CONNECTION_STATUS";

export const initialState: IStore = {
    devices:
    [
        {
            id: "0",
            name:"Лампа 1",
            type: DeviceTypes.Lamp,
            isOn: true,
            image: lamp
        },
        {
            id: "1",
            name:"Лампа 2",
            type: DeviceTypes.Lamp,
            isOn:false,
            image: lamp
        },
        {
            id: "2",
            name:"Розетка 1",
            type: DeviceTypes.Lamp,
            isOn:false,
            image: powerSocket
        }
    ],
    Connection:{
        status: ConnectionStatuses.Disconnected
    }
}

export const storeActions = {

    setDevices: (devices:[]) => async (dispatch: any) => {
        dispatch({
            type: setDevices,
            payload:{
                devices
            }
        })
    },

    setConnectionStatus: (status: ConnectionStatuses) => async (dispatch: any) =>{
        dispatch({
            type: setConnectionStatus,
            payload:{
                status
            }
        })
    }
}


export const reducer = (state: IStore = initialState, action: any): IStore => {
    switch (action.type) {
        case setDevices: {
            const { devices } = action.payload;
            return {
                ...state,
                devices: [...devices]
            }
        }
        case setConnectionStatus:{
            const {status} = action.payload;
            return{
                ...state,
                Connection:{
                    ...state.Connection,
                    status: status
                }
            }
        }
        default:
            return state;

    }
}

export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

