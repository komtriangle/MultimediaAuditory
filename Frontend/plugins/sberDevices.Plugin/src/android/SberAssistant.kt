package sberDevices.Plugin

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
import ru.sberdevices.messaging.Payload
import ru.sberdevices.services.appstate.AppStateManagerFactory
import org.koin.android.ext.koin.androidContext
import org.koin.androidx.viewmodel.dsl.viewModel
import org.koin.core.context.startKoin
import org.koin.dsl.module
import android.app.Application
import android.os.Build
import android.os.Looper

class SberAssistant: Application() {

//    override  fun onConfigurationChanged(newConfig: Configuration?) {
//        super.onConfigurationChanged(newConfig) // add this line
//        setContentView(R.layout.main)
//    }

    private val logger = Logger.get("SdkDemoApplication")

    private val utilsModule = module {
        single { AppStateManagerFactory.createHolder(context = get()) }
    }

    private val viewModelModule = module {
        single { sberDevicesPlugins(
            messaging = get()
        )
        }
    }

    override fun onCreate() {
        super.onCreate()
        logger.debug { "onCreate" }

        // Example of getting device's info
        logger.info { "Running on device: ${Build.BRAND} ${Build.MODEL}" }

        if (Looper.myLooper() == Looper.getMainLooper()) {
            initApp()
        }
    }

    private fun initApp() {
        startKoin {
            androidContext(this@SberAssistant)
            modules(listOf(utilsModule, viewModelModule))
        }
    }




}