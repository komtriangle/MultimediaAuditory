import {createAssistant, createSmartappDebugger} from "@sberdevices/assistant-client";
import EventEmitter from 'eventemitter3';
import React, {
  useRef,
  useEffect,
} from "react";

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

export const AssistantWrapper = (type: string) => {
  const assistantStateRef = useRef<any>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();
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
  switch (type) {
    case "init":
      console.log("assistant")
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);
    sendHello()
    break;
    default:
      break
  }
  
  }

}