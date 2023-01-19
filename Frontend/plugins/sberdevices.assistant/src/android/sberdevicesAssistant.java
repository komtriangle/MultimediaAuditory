package sberdevices.assistant;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import ru.sberdevices.services.assistant.PublicAssistantFactory;
import ru.sberdevices.services.appstate.AppStateManagerFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class sberdevicesAssistant extends CordovaPlugin {
	
	
	private val listener = object : Messaging.Listener {
        override fun onMessage(messageId: MessageId, payload: Payload) {
            logger.debug { "Message ${messageId.value} received: ${payload.data}" }
 
        }
 
        override fun onError(messageId: MessageId, throwable: Throwable) {              // создаем обработчик ошибок
            logger.error { throwable.stackTraceToString() }
        }
		}
	

    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("coolMethod")) {
            String message = args.getString(0);
            this.coolMethod(message, callbackContext);
            return true;
        }
        return false;
	}
		
		

    private void coolMethod(String message, CallbackContext callbackContext) {
		AppStateManagerFactory.createHolder(context = get());
		MessagingFactory.create(appContext = get());
		messaging.addListener(listener);
		logger.error("cool method");
        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
}
