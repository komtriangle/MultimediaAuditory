import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LampPage from './Components/DevicePages/LampPage';
import DevicesPage from './Components/DevicesPage';
import { PAGES_TYPE } from './Consts/Pages';
import Connector from './SignalRConnector/Connector'
import './Content/Styles/styles.scss';
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import { storeActions } from './Store/store';
import getUpdatedState from './Store/devicesStateUpdater';

function App(props:any) {
  const {  events } = Connector;
  useEffect(() => {
    //Connector.subscribeForChanges();
    events((state) =>{
       props.setDevices(getUpdatedState(state));
    })
  },[]);
 
  return (

    <>
     <Router>
        <Routes>
          <Route path={PAGES_TYPE.DEVICES} element={<DevicesPage />}  />
          <Route path={`${PAGES_TYPE.DEVICE}/:id`} element={<LampPage />}  />
        </Routes>
      </Router>
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
     setDevices: storeActions.setDevices
  }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
