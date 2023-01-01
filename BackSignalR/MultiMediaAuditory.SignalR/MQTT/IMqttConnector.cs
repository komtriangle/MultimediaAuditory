using MultiMediaAuditory.SignalR.Models;
using System.Threading.Tasks;

namespace MultiMediaAuditory.SignalR.MQTT
{
	public interface IMqttConnector
	{
		 Task Publish(RequestModel request);
	}
}
