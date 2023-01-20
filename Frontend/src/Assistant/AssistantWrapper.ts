import {createAssistant, createSmartappDebugger} from "@salutejs/client";
import Connector from "../SignalRConnector/Connector";

const { events, sendCommand } = Connector;

export const initializeAssistant = (getState: any) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }
  return createAssistant({getState});
};


export const handleAssistantAction = (action: any) => {
  console.log('AssistantWrapper.dispatchAssistantAction:', action)

  if (!action) return;
  console.log(action.command);
  switch (action.command) {
    case 'on':
      sendCommand({ DeviceId: `${action.id}`, ControlName: 'on-off', Value: 'on' });
      break;
    case 'off':
      sendCommand({ DeviceId: `${action.id}`, ControlName: 'on-off', Value: 'off' });
      break;
    default:
      break;
  }
}
