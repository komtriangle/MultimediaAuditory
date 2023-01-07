using MultiMediaAuditory.SignalR.Models.Enums;

namespace MultiMediaAuditory.SignalR.Models
{
	/// <summary>
	/// Запрос на изменение состояния устройства
	/// </summary>
	public class RequestModel
	{
		/// <summary>
		/// Идентификатор устройста
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
