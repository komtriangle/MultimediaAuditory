using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace MultiMediaAuditory.SignalR
{
	public class Program
	{
		public static void Main(string[] args)
		{
			

			CreateHostBuilder(args).Build().Run();
		}

		public static IHostBuilder CreateHostBuilder(string[] args) =>
			Host.CreateDefaultBuilder(args)
			.ConfigureLogging((hostBuilderContext, configureLogging) =>
			{
				Log.Logger = new LoggerConfiguration()
					.ReadFrom.Configuration(hostBuilderContext.Configuration)
					.CreateLogger();
			})
			.UseSerilog()
			.ConfigureWebHostDefaults(webBuilder =>
			{
				webBuilder.UseStartup<Startup>();
			});
	}
}
