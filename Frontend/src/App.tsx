import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route, HashRouter, } from 'react-router-dom';
import './App.css';
import LampPage from './Pages/LampPage';
import DevicesPage from './Pages/DevicesPage';
import { PAGES_TYPE } from './Consts/Pages';
import Connector from './SignalRConnector/Connector'
import './Content/Styles/styles.scss';
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import { initialState, storeActions } from './Store/store';
import getUpdatedState from './Store/devicesStateUpdater';
import SpinnerPage from './Pages/SpinnerPage';
import { ConnectionStatuses } from './Consts/ConnectionStatuses';
import { GlobalStyle, CharacterId, CHAR_SBER } from './Components/GlobalStyles';
import { createAssistant, createSmartappDebugger } from "@sberdevices/assistant-client";

export const initializeAssistant = (getState: any) => {
 // if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
 // }
  return createAssistant({ getState });
};

const App = (props: any) => {
  const { events, sendCommand } = Connector;
  const assistantStateRef = useRef<any>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();
  
   const [character, setCharacter] = useState<CharacterId>(CHAR_SBER);
  useEffect(() => {
    // Connector.subscribeForChanges();
    console.log("assistant")
   assistantRef.current = initializeAssistant(() => assistantStateRef.current);
    sendHello()
    assistantRef.current.on("data", (action: any) => {
      handleAssistantDataEvent(action)
    });
    events((state) => props.setDevices(getUpdatedState(state)),
      () => props.setConnectionStatus(ConnectionStatuses.Connected),
      () => props.setConnectionStatus(ConnectionStatuses.Disconnected))
  }, []);

  const sendAction = (action: any) => {
    console.log(action);
    return assistantRef?.current?.sendData({
      action
    })
  }

  const sendHello = () => {
    sendAction({
      action_id: "hello_phrase"
    })
  }

  const handleAssistantAction = (action: any) => {
    console.log('AssistantWrapper.dispatchAssistantAction:', action)

    if (!action) return;

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

  const handleAssistantDataEvent = (event: any) => {
    console.log('AssistantWrapper.handleAssistantDataEvent: event:', event);
    switch (event?.type) {
      case "character":
        console.log(event.type)
        setCharacter(event.character?.id)
        break;
      case "sdk_answer":
        break;

      case "smart_app_data":
        handleAssistantAction(event.action)
        break

      default:
        break
    }
  }

  return (
    <>
      <GlobalStyle character={character}>
        <SpinnerPage />
        <HashRouter >
          <Routes>
            <Route path={PAGES_TYPE.DEVICES} element={<DevicesPage />} />
            <Route path={`${PAGES_TYPE.DEVICE}/:id`} element={<LampPage sendAction={sendAction} />} />
          </Routes>
        </HashRouter>
      </GlobalStyle>
    </>
  );
}

function mapStateToProps(state: any) {
  return {
    devices: state.devices,
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setDevices: storeActions.setDevices,
    setConnectionStatus: storeActions.setConnectionStatus
  }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
