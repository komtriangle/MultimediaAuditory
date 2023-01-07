using Microsoft.Extensions.Options;
using MQTT.Test.Configuration;
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;
using MQTTnet.Protocol;
using MQTTnet.Server;
using System;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MQTT.Test.MQTT
{
	public class MqttConnector
	{
		private readonly MqttConfig _mqttConfig;
		private readonly IMqttClient _mqttClient;
		private readonly IMqttClientOptions _options;
		private  int MessageCounter = 0;
		public MqttConnector(MqttConfig mqttConfig)
		{

			_mqttConfig = mqttConfig;

			var factory = new MqttFactory();

			_mqttClient = factory.CreateMqttClient();

			_options = new MqttClientOptionsBuilder()
									 .WithTcpServer(_mqttConfig.Host, _mqttConfig.Port)
									.WithCredentials(_mqttConfig.UserName, _mqttConfig.Password)
									.WithClientId(Guid.NewGuid().ToString().Substring(0, 5))
									.Build();


			_mqttClient.ConnectAsync(_options, CancellationToken.None).Wait();

			 _mqttClient.SubscribeAsync(new TopicFilterBuilder()
				.WithTopic("/devices/#")
				.WithQualityOfServiceLevel((MQTTnet.Protocol.MqttQualityOfServiceLevel)1)
				.Build()).Wait();

			_mqttClient.UseApplicationMessageReceivedHandler(e =>
			{
				try
				{
					string topic = e.ApplicationMessage.Topic;

					topic = topic.Replace("/devices/", "/devices_changes/");

					if(string.IsNullOrWhiteSpace(topic) == false)
					{
						string payload = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);
						Console.WriteLine($"Topic: {topic}. Message Received: {payload}");

						try
						{
							_mqttClient.PublishAsync(topic, payload);
						}
						catch(Exception ex)
						{
							Console.WriteLine(ex.Message);
						}
					}


					
				}
				catch(Exception ex)
				{
					Console.WriteLine(ex.Message, ex);
				}
			});
		}

		
	}
}
