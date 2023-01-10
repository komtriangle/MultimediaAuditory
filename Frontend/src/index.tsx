import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  App  from './App';
import reportWebVitals from './reportWebVitals';
import { DeviceThemeProvider } from '@sberdevices/plasma-ui/components/Device';
import { Provider } from 'react-redux'
import {  store } from './Store/store';

let startApp = () => {

  const DeviceThemeProviderrProps = { // make sure all required component's inputs/Props keys&types match
    responsiveTypo:true
  }



  ReactDOM.render(
    <DeviceThemeProvider
      {...DeviceThemeProviderrProps}
      >

      <Provider store={store}>
        <App />
      </Provider>
    </DeviceThemeProvider>,
    document.getElementById('root'));
}
declare let window: any; 

if (!window.cordova) {
  startApp()
} else {
  document.addEventListener('deviceready', startApp, false)
}

reportWebVitals();
