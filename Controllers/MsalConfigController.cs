using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppWithAngular.Model;

namespace WebAppWithAngular.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MsalConfigController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public MsalConfigController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        [HttpGet]
        public ActionResult<MsalConfig> GetMsalConfig()
        {
            string TenantId = this._configuration["AzureAd:TenantId"];
            string ClientId = this._configuration["AzureAd:ClientId"];

            MsalConfig config = new()
            {
                tenantId = TenantId,
                clientId = ClientId
            };

            return Ok(config);
        }
    }

}
