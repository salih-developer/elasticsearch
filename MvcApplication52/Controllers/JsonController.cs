using System.Web.Mvc;

namespace MvcApplication52.Controllers
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.IO;
    using System.Runtime.Caching;
    using System.Security.Cryptography.X509Certificates;
    using System.Text;

    using Elasticsearch.Net;

    using MvcApplication52.Common;
    using MvcApplication52.Models;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    public class JsonController : Controller
    {

        public ActionResult Index(string index)
        {
            return null;
        }
        [HttpPost]
        public string SearchAll(FilterParam filterParam)
        {
            try
            {

                JObject query = new JObject();
                if (!string.IsNullOrEmpty(filterParam.SearchField)
                    && !string.IsNullOrEmpty(filterParam.SearchFieldValue))
                {
                    query["query"] = new JObject();
                    query["query"]["bool"] = new JObject();
                    query["query"]["bool"]["must"] = new JObject();
                    query["query"]["bool"]["must"]["query_string"] = new JObject();
                    query["query"]["bool"]["must"]["query_string"]["default_field"] = new JObject();
                    query["query"]["bool"]["must"]["query_string"]["default_field"] = filterParam.SearchField;
                    query["query"]["bool"]["must"]["query_string"]["query"] = new JObject();
                    query["query"]["bool"]["must"]["query_string"]["query"] = filterParam.SearchFieldValue;
                }

                query["sort"] = new JObject();
                query["sort"][filterParam.SortField] = new JObject();
                query["sort"][filterParam.SortField]["reverse"] = filterParam.Sort;
                query["from"] = filterParam.from;
                query["size"] = filterParam.size;
                string stringQuery = JsonConvert.SerializeObject(query);
                var ff = ElasticSearchManager.InstanceNet(filterParam.IpAddress).Search(string.IsNullOrEmpty(filterParam.IndexName) ? "_all" : filterParam.IndexName, stringQuery);
                return ff.Response["hits"];
            }
            catch (Exception)
            {
                return string.Empty;
            }

        }

        /// <summary>The delete doc.</summary>
        /// <param name="ipaddres">The ipaddres.</param>
        /// <param name="indexname">The indexname.</param>
        /// <param name="indextype">The indextype.</param>
        /// <param name="id">The id.</param>
        /// <returns>The <see cref="string"/>.</returns>
        public string DeleteDoc(string ipaddres, string indexname, string indextype, string id)
        {
            var result = ElasticSearchManager.InstanceNet(ipaddres).Delete(indexname, indextype, id);
            return result.Success.ToString();
        }

        /// <summary>The get all properties.</summary>
        /// <param name="filterParam">The filter param.</param>
        /// <returns>The <see cref="ActionResult"/>.</returns>
        [HttpPost]
        public string GetAllProperties(FilterParam filterParam)
        {
            var statusResponse = ElasticSearchManager.GetData(string.Format("{0}{1}", filterParam.IpAddress, "_stats"));
            return statusResponse;
        }

        /// <summary>The get all properties 2.</summary>
        /// <param name="filterParam">The filter param.</param>
        /// <returns>The <see cref="string"/>.</returns>
        [HttpPost]
        public string GetAllPropertiesv2(FilterParam filterParam)
        {
            var statusResponse = ElasticSearchManager.InstanceNet(filterParam.IpAddress).ClusterState();
            return statusResponse.Response["metadata"];
        }

        /// <summary>The get nodes.</summary>
        /// <param name="filterParam">The filter param.</param>
        /// <returns>The <see cref="string"/>.</returns>
        [HttpPost]
        public string GetNodes(FilterParam filterParam)
        {
            var statusResponse = ElasticSearchManager.InstanceNet(filterParam.IpAddress).ClusterState();
            return statusResponse.Response["nodes"];
        }

        /// <summary>The register api address.</summary>
        /// <param name="idAddres">The id addres.</param>
        public string RegisterapiAddress(string idAddres)
        {
            string file = string.Format("{0}{1}", Server.MapPath("/"), "ipaddresses.xml");
            if (System.IO.File.Exists(file))
            {
                var ds = new DataSet();
                ds.ReadXml(file);
                var datatable = ds.Tables["ipadresses"];
                DataRow[] data = datatable.Select(string.Format("url='{0}'", idAddres));
                if (data.Length == 0)
                {
                    var datarow = datatable.NewRow();
                    datarow["url"] = idAddres;
                    datatable.Rows.Add(datarow);
                    datatable.WriteXml(file);
                }
            }
            else
            {
                var ds = new DataSet();
                var datatable = new DataTable { TableName = "ipadresses" };
                datatable.Columns.Add("url");
                var datarow = datatable.NewRow();
                datarow["url"] = idAddres;
                datatable.Rows.Add(datarow);
                ds.Tables.Add(datatable);
                datatable.WriteXml(file);
            }

            return "ok";
        }

        /// <summary>The readip address.</summary>
        /// <returns>The <see cref="string"/>.</returns>
        public string ReadipAddress()
        {
            string file = string.Format("{0}{1}", Server.MapPath("/"), "ipaddresses.xml");
            if (System.IO.File.Exists(file))
            {
                var ds = new DataSet();
                ds.ReadXml(file);
                var datatable = ds.Tables["ipadresses"];
                var jsoNresult = JsonConvert.SerializeObject(datatable);
                return jsoNresult;
            }
            return string.Empty;
        }

        /// <summary>The get cpu and memory.</summary>
        /// <param name="filterParam">The filter param.</param>
        /// <returns>The <see cref="string"/>.</returns>

        public string GetCpuAndMemory(string ipAddress, string node)
        {

            var statusResponse = ElasticSearchManager.GetData(ipAddress + "_nodes/" + node + "/hot_threads");
            string cpu = statusResponse.Substring(0, statusResponse.IndexOf("%")).Substring(statusResponse.IndexOf("%") - 6).Trim();
            var tt = Convert.ToDecimal(cpu.Replace(".", ","));

            var data = new List<SelectListItem>();
            var obj = HttpContext.Application["sputimerdate" + node];
            if (obj != null)
            {
                data = (List<SelectListItem>)obj;
            }
            data.Add(new SelectListItem { Text = string.Format("{0}.{1}", DateTime.Now.Minute, DateTime.Now.Second.ToString("00")), Value = tt.ToString().Replace(",", ".") });
            HttpContext.Application["sputimerdate" + node] = data;
            var sb = new StringBuilder();
            data.ForEach(item => sb.AppendFormat("[{0},{1}],", item.Text, item.Value));
            var ss = "[[" + sb.ToString().Substring(0, sb.ToString().Length - 1) + "]]";
            return ss;
        }
    }
}
