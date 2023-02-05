package sberDevices.Plugin

import android.app.Application
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.json.JSONArray
import ru.sberdevices.common.assert.Asserts
import ru.sberdevices.common.binderhelper.BinderHelperFactory2
import ru.sberdevices.common.binderhelper.BinderHelperFactory2Impl
import ru.sberdevices.common.logger.AndroidLoggerDelegate
import ru.sberdevices.common.logger.Logger
import ru.sberdevices.messaging.MessageId
import ru.sberdevices.messaging.Messaging
//import ru.sberdevices.services.appstate.AppStateHolder
import ru.sberdevices.messaging.Payload
import ru.sberdevices.services.appstate.AppStateManagerFactory
import io.mockk.Runs
import io.mockk.every
import io.mockk.just
import io.mockk.mockk
import io.mockk.slot


/**
 * This class echoes a string called from JavaScript.
 */
class sberDevicesPlugins(messaging: Messaging) : CordovaPlugin() {

    private  val listener =  object : Messaging.Listener {
        override fun onMessage(messageId: MessageId, payload: Payload) {
            //val sberMessage = Gson().fromJson(
            //					payload.data,
            //					SberMessage::class.java
            //			)

            print("Bye world...")
            //callbackContext.success(payload.data);

        }

        override fun onError(messageId: MessageId, throwable: Throwable) {
            //callbackContext.error("ERROR");
        }
    }
    init {
        messaging.addListener(listener)
    }


    override fun execute(
        action: String,
        args: JSONArray,
        callbackContext: CallbackContext
    ): Boolean {
        if (true) {
            val message: String = args.getString(0)
            coolMethod(message, callbackContext)
//            listener = object : Messaging.Listener {
//                override fun onMessage(messageId: MessageId, payload: Payload) {
//                    //val sberMessage = Gson().fromJson(
//                    //					payload.data,
//                    //					SberMessage::class.java
//                    //			)
//                    callbackContext.success(payload.data);
//
//                }
//
//                override fun onError(messageId: MessageId, throwable: Throwable) {
//                    callbackContext.error("ERROR");
//                }
//            }
           // every { messaging.addListener(listener = listener) } just Runs



            return true
        }

        return false
    }

    private fun coolMethod(
        message: String,
        callbackContext: CallbackContext
    ) {
        if (message.isNotEmpty()) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

}
