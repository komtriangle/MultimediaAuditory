using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MultiMediaAuditory.SignalR.Hubs;
using MultiMediaAuditory.SignalR.MQTT;
using MultiMediaAuditory.SignalR.MQTT.Configuration;
using Serilog;
using System;

namespace MultiMediaAuditory.SignalR
{
	public class Startup
	{

		private IConfiguration _configuration;

		public Startup(IConfiguration configuration)
		{
			_configuration = configuration;
		}
		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddSignalR();
			services.AddCors();

			services.AddSingleton<IMqttConnector, MqttConnector>();

			var mqttConfig = _configuration.GetSection("MqttConfiguration");
			services.Configure<MqttConfig>(mqttConfig);


		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if(env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseWebSockets(new WebSocketOptions
			{
				KeepAliveInterval = TimeSpan.FromSeconds(120),
			});

			app.UseFileServer();
			app.UseRouting();

			app.UseCors(x => x
			   .AllowAnyMethod()
			   .AllowAnyHeader()
			   .SetIsOriginAllowed(origin => true) // allow any origin
			   .AllowCredentials());

			


			app.UseEndpoints(endpoints =>
			{
				endpoints.MapHub<DevicesHub>("/device");
			});
		}
	}
}
