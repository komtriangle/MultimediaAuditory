using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using MQTTnet;
using MultiMediaAuditory.SignalR.Models;
using MultiMediaAuditory.SignalR.MQTT;
using MultiMediaAuditory.SignalR.MQTT.Utils;
using System;
using System.Text;
using System.Threading.Tasks;

namespace MultiMediaAuditory.SignalR.Hubs
{
	public class DevicesHub : Hub
	{
		private IHubContext<DevicesHub> _hubContext;
		private readonly IMqttConnector _mqttConnector;
		private readonly ILogger<DevicesHub> _logger;

		public DevicesHub(IMqttConnector mqttConnector, IHubContext<DevicesHub> hubContext, ILogger<DevicesHub> logger)
		{
			_mqttConnector = mqttConnector;
			_hubContext = hubContext;
			_logger = logger;
		}

		public async Task ReceiveCommand(RequestModel request)
		{
			await _mqttConnector.Publish(request);

			var response = new ResponseModel()
			{
				DeviceId = request.DeviceId,
				ControlName = request.ControlName,
				Value = request.Value,
			};
		}

		/// <summary>
		/// Подписка на получение событий обновлений от устройств
		/// </summary>
		/// <returns></returns>
		public void SubscribeDevicesChanges()
		{
			_mqttConnector.SubscribeToChanges();
			_mqttConnector.RegisterChangesHandler(ChangesHandler);
		}

		private void ChangesHandler(MqttApplicationMessageReceivedEventArgs e)
		{
			try
			{
				string topic = e.ApplicationMessage.Topic;

				if(string.IsNullOrWhiteSpace(topic) == false)
				{
					string payload = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);

					_logger.LogInformation("Получено сообщение: {@payload} из топика: {@topic}", payload, topic);

				 	_hubContext.Clients.All.SendAsync("deviceChange", MqttHelper.ParseResponseModel(topic, payload)).Wait();
				}
			}
			catch(Exception ex)
			{
				_logger.LogError(ex, "Ошибка во время обработки сообщения: {@e}", e);
			}

		}

	}
}
