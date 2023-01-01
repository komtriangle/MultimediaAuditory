using Microsoft.Extensions.Options;
using MQTT.Test.Configuration;
using MQTT.Test.MQTT;

namespace MQTT.Test.HostedServices
{
	public class MqttWorker : BackgroundService
	{
		private readonly MqttConfig _mqttConfig;

		public MqttWorker(IOptions<MqttConfig> mqttConfig)
		{
			_mqttConfig = mqttConfig.Value;
		}
		protected override async Task ExecuteAsync(CancellationToken stoppingToken)
		{
			MqttConnector connector = new MqttConnector(_mqttConfig);
			while(!stoppingToken.IsCancellationRequested)
			{
				await Task.Delay(10000);
			}

		}
	}
}
