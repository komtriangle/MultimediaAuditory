package sberDevices.Plugin

import org.apache.cordova.CordovaPlugin
import android.app.Application
import org.apache.cordova.CallbackContext
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject
import ru.sberdevices.messaging.MessageId
import ru.sberdevices.messaging.MessageName
import ru.sberdevices.messaging.Messaging
import ru.sberdevices.messaging.Payload
import ru.sberdevices.services.appstate.AppStateManagerFactory
import ru.sberdevices.services.assistant.PublicAssistantFactory
import ru.sberdevices.common.assert.Asserts
import ru.sberdevices.common.binderhelper.BinderHelperFactory2
import ru.sberdevices.common.binderhelper.BinderHelperFactory2Impl
import ru.sberdevices.common.coroutines.CoroutineDispatchers
import ru.sberdevices.common.logger.AndroidLoggerDelegate
import ru.sberdevices.common.logger.Logger
import ru.sberdevices.messaging.MessagingFactory
import io.mockk.mockk


/**
 * This class echoes a string called from JavaScript.
 */
class sberDevicesPlugins : CordovaPlugin() {

    private val messaging: Messaging = mockk()

    init {
        AppStateManagerFactory.createHolder()
        MessagingFactory.create()
    }


    var listener: Messaging.Listener = object : Messaging.Listener {
        override fun onMessage(messageId: MessageId, payload: Payload) {
            //val sberMessage = Gson().fromJson(
            //					payload.data,
            //					SberMessage::class.java
            //			)

        }

        override fun onError(messageId: MessageId, throwable: Throwable) {
            // Пришла ошибка: ~~будем плакать~~ обработаем ее
        }
    }

    override fun execute(
        action: String,
        args: JSONArray,
        callbackContext: CallbackContext
    ): Boolean {
        if (true) {
            val message: String = args.getString(0)
            coolMethod(message, callbackContext)
            listener = object : Messaging.Listener {
                override fun onMessage(messageId: MessageId, payload: Payload) {
                    //val sberMessage = Gson().fromJson(
                    //					payload.data,
                    //					SberMessage::class.java
                    //			)
                    callbackContext.success(payload.data);

                }

                override fun onError(messageId: MessageId, throwable: Throwable) {
                    callbackContext.error("ERROR");
                }
            }

            messaging.addListener(listener)

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
