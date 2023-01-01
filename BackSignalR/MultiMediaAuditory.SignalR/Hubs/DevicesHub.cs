using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MultiMediaAuditory.SignalR.Models;
using MultiMediaAuditory.SignalR.Models.Enums;
using MultiMediaAuditory.SignalR.MQTT;
using MultiMediaAuditory.SignalR.MQTT.Configuration;
using Serilog;
using System;
using System.Threading.Tasks;

namespace MultiMediaAuditory.SignalR.Hubs
{
	public class DevicesHub : Hub
	{
		private readonly MqttConfig _mqttConfig;
		private readonly IMqttConnector _mqttConnector;
		private readonly ILogger<DevicesHub> _logger;

		public DevicesHub(IMqttConnector mqttConnector, ILogger<DevicesHub> logger)
		{
			_mqttConnector = mqttConnector;
			_logger = logger;
		}

		public async Task ReceiveCommand(RequestModel request)
		{
			try
			{
				await _mqttConnector.Publish(request);
				_logger.LogInformation("Пакет: {@request} отправлен в MQTT", request);
			}
			catch(Exception ex)
			{
				_logger.LogError(ex,"Ошибка при тправке пакета: {@request} в MQTT", request);

			}

			await Clients.All.SendAsync("deviceChange", new ResponseModel()
			{
				DeviceId= request.DeviceId,
				ControlName = request.ControlName,
				Value = request.Value != "on" ? "off": "on"
			});
		}

		/// <summary>
		/// Подписка на получение событий обновлений от устройств
		/// </summary>
		/// <returns></returns>
		public async Task SubscribeDevicesChanges()
		{
			 

		}

		private async Task ProcessLampCommand(RequestModel request)
		{
			//await Clients.All.SendAsync("messageReceived", user, message);
		}
	}
}
