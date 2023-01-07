using MultiMediaAuditory.SignalR.Models;

namespace MultiMediaAuditory.SignalR.MQTT.Utils
{
	public static class MqttHelper
	{
		public static ResponseModel ParseResponseModel(string topic, string payload)
		{
			string[] topicItems = topic.Split('/');

			string deviceName = topicItems[2];
			string controlName = topicItems[4];

			return new ResponseModel()
			{
				DeviceId = deviceName,
				ControlName = controlName,
				Value = payload
			};
		}
	}
}
