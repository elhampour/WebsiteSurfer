using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Net;
using System.Net.Http;

namespace Proxy.Controllers
{
    public class Dto
    {
        public string ProxyIp { get; set; }

        public int ProxyPort { get; set; }

        public string Url { get; set; }
    }

    public class MakeRequestDto
    {
        public bool Success { get; set; }

        public string Response { get; set; }

        public bool TryAgain { get; set; }
    }

    public static class ForwardProxyExtentions
    {
        public static MakeRequestDto MakeProxyRequest(string proxyServer, int proxyServerPort, string targetAddress)
        {
            try
            {
                string responseString = string.Empty;
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(targetAddress);
                WebProxy myproxy = new WebProxy(proxyServer, proxyServerPort);
                myproxy.BypassProxyOnLocal = false;
                request.Proxy = myproxy;
                request.Method = "GET";

                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                {
                    var dataStream = response.GetResponseStream();
                    var reader = new StreamReader(dataStream);
                    responseString = reader.ReadToEnd();
                    reader.Close();
                    dataStream.Close();
                }

                return new MakeRequestDto()
                {
                    Success = true,
                    Response = responseString
                };

            }
            catch (Exception ex)
            {
                var indexOf = ex.Message.ToLower().Contains("too many request");
                if (indexOf)
                {
                    return new MakeRequestDto()
                    {
                        Success = false,
                        TryAgain = false
                    };
                }
                return new MakeRequestDto()
                {
                    Success = false,
                    TryAgain = true
                };
            }
        }
    }

    public class HomeController : Controller
    {
        [HttpGet]
        public OkObjectResult Get([FromBody] Dto dto)
        {
            var makeRequestDto = ForwardProxyExtentions.MakeProxyRequest(
                    dto.ProxyIp,
                    dto.ProxyPort,
                    dto.Url);
            return Ok(makeRequestDto);
        }
    }
}
