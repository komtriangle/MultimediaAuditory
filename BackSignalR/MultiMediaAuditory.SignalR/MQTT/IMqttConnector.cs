using MQTTnet;
using MultiMediaAuditory.SignalR.Models;
using System;
using System.Threading.Tasks;

namespace MultiMediaAuditory.SignalR.MQTT
{
	public interface IMqttConnector
	{
		 Task Publish(RequestModel request);
		 void SubscribeToChanges();
		 void RegisterChangesHandler(Action<MqttApplicationMessageReceivedEventArgs> action);
	}
}
