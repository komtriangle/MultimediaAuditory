using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;
using MQTTnet.Extensions.ManagedClient;
using MQTTnet.Server;
using MultiMediaAuditory.SignalR.Models;
using MultiMediaAuditory.SignalR.MQTT.Configuration;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MultiMediaAuditory.SignalR.MQTT
{
	public class MqttConnector : IMqttConnector
	{
		private readonly MqttConfig _mqttConfig;
		private readonly IMqttClient _mqttClient;
		private readonly IMqttClientOptions _options;
		private readonly ILogger<MqttConnector> _logger;
		public MqttConnector(IOptions<MqttConfig> mqttConfigOptions, ILogger<MqttConnector> logger)
		{
			_logger = logger;

			_mqttConfig = mqttConfigOptions.Value;

			var factory = new MqttFactory();

			_mqttClient = factory.CreateMqttClient();

			_options = new MqttClientOptionsBuilder()
									.WithTcpServer(_mqttConfig.Host, _mqttConfig.Port)
									.WithCredentials(_mqttConfig.UserName, _mqttConfig.Password)
									.WithClientId(Guid.NewGuid().ToString().Substring(0, 5))
									.Build();

			RegisterOnConnectionHandler();
			RegisterOnDisconnectedHandler();

			_mqttClient.ConnectAsync(_options, CancellationToken.None).Wait();
		}

		public async Task Publish(RequestModel request)
		{
			string topic = CreateTopicName(request);

			try
			{
				await _mqttClient.PublishAsync(topic, request.Value);
				_logger.LogInformation($"Пакет успешно отправлен в топик: {topic}");
			}
			catch(Exception ex)
			{
				_logger.LogError(ex, $"Ошибка во время отправки сообщения в топик: {topic}");
			}
		}

		public void SubscribeToChanges()
		{
			_mqttClient.SubscribeAsync(new TopicFilterBuilder()
			   .WithTopic("/devices_changes/#")
			   .WithQualityOfServiceLevel((MQTTnet.Protocol.MqttQualityOfServiceLevel)1)
			   .Build()).Wait();
		}

		public void RegisterChangesHandler(Action<MqttApplicationMessageReceivedEventArgs> action)
		{
			_mqttClient.UseApplicationMessageReceivedHandler(action);
		}

		private string CreateTopicName(RequestModel request)
		{
			return $"/devices/{request.DeviceId}/controls/{request.ControlName}";
		}

		private void RegisterOnConnectionHandler()
		{
			_mqttClient.UseConnectedHandler(_ =>
			{
				_logger.LogInformation("Выполнено подключение к брокеру MQTT");
			});
		}

		private void RegisterOnDisconnectedHandler()
		{
			_mqttClient.UseApplicationMessageReceivedHandler(async e =>
			{
				_logger.LogWarning("Соединение с брокером MQTT разрвано");
				await Task.Delay(TimeSpan.FromSeconds(5));
				int attemp = 1;
				while(true)
				{
					try
					{
						_logger.LogInformation($"Попытка {attemp} переподключиться к брокеру MQTT");
						await _mqttClient.ConnectAsync(_options);
						_logger.LogInformation($"Переподключение к брокеру MQTT выполнено с {attemp} попытка");
					}
					catch(Exception ex)
					{
						_logger.LogError($"Ошибка во время подключения к MQTT брокеру. Попытка: {attemp}");

					}
				}
			});
		}
	}
}
