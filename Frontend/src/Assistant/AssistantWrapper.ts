import {createAssistant, createSmartappDebugger} from "@sberdevices/assistant-client";
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
