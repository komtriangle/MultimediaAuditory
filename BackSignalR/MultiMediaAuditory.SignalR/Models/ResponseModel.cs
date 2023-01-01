

namespace MultiMediaAuditory.SignalR.Models
{
	/// <summary>
	/// Сообщение о состоянии устройства
	/// </summary>
	public class ResponseModel
	{
		/// <summary>
		/// Название устройста
		/// </summary>
		public string DeviceId { get; set; }

		/// <summary>
		/// Название изменяемого параметра
		/// </summary>
		public string ControlName { get; set; }

		/// <summary>
		/// Значение изменяемого параметра
		/// </summary>
		public string Value { get; set; }
	}
}
