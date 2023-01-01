using Microsoft.Extensions.Options;
using MQTT.Test.Configuration;
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;
using MQTTnet.Protocol;
using MQTTnet.Server;
using System.Net;
using System.Text;

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

			var a = IPAddress.Parse(_mqttConfig.Host);
			var options = new MqttServerOptionsBuilder()
												 .WithDefaultEndpointBoundIPAddress(IPAddress.Parse(_mqttConfig.Host))
												 .WithDefaultEndpointPort(_mqttConfig.Port)
												 .WithApplicationMessageInterceptor(OnNewMessage)
												 .WithDefaultCommunicationTimeout(TimeSpan.FromSeconds(10))
												   .WithConnectionValidator(t =>
												   {
													   if(t.Username != mqttConfig.UserName || t.Password != mqttConfig.Password)
													   {
														   t.ReasonCode = MqttConnectReasonCode.BadUserNameOrPassword;
													   }
													   t.ReasonCode = MqttConnectReasonCode.Success;
												   })
												   .Build();


			IMqttServer mqttServer = new MqttFactory().CreateMqttServer();

			try
			{
				mqttServer.StartAsync(options).Wait();
			}
			catch(Exception ex)
			{

			}
		}

		public void OnNewMessage(MqttApplicationMessageInterceptorContext context)
		{
			var payload = context.ApplicationMessage?.Payload == null ? null : Encoding.UTF8.GetString(context.ApplicationMessage?.Payload);

			MessageCounter++;

			Console.WriteLine
			(
				"MessageId: {MessageCounter} - TimeStamp: {TimeStamp} -- Message: ClientId = {clientId}, Topic = {topic}, Payload = {payload}, QoS = {qos}, Retain-Flag = {retainFlag}",
				MessageCounter,
				DateTime.Now,
				context.ClientId,
				context.ApplicationMessage?.Topic,
				payload,
				context.ApplicationMessage?.QualityOfServiceLevel,
				context.ApplicationMessage?.Retain);
		}


		private void RegisterOnDisconnectedHandler()
		{
			_mqttClient.UseApplicationMessageReceivedHandler(async e =>
			{
				
				await Task.Delay(TimeSpan.FromSeconds(5));
				int attemp = 1;
				while(true)
				{
					try
					{
						
						await _mqttClient.ConnectAsync(_options);
					}
					catch(Exception ex)
					{


					}
				}
			});
		}
	}
}
