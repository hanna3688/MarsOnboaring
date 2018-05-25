using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Mars_Onboarding2.Startup))]
namespace Mars_Onboarding2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
