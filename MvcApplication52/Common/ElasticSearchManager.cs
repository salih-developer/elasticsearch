namespace MvcApplication52.Common
{
    using System;
    using System.Configuration;
    using System.Net;
    using System.Web;

    using Elasticsearch.Net;
    using Elasticsearch.Net.Connection;

    using Nest;

    /// <summary>The elastic search manager.</summary>
    public class ElasticSearchManager
    {

        /// <summary>The ınstance.</summary>
        /// <param name="index">The index.</param>
        /// <returns>The <see cref="ElasticClient"/>.</returns>
        public static ElasticClient Instance(string index, string ipaddres)
        {
            var settings = new ConnectionSettings(new Uri(ipaddres));
            settings.SetDefaultIndex(index);
            return new ElasticClient(settings);
        }

        /// <summary>The ınstance.</summary>
        /// <returns>The <see cref="ElasticClient"/>.</returns>
        public static ElasticClient Instance(string ipaddres)
        {
            var settings = new ConnectionSettings(new Uri(ipaddres));
            return new ElasticClient(settings);
        }

        /// <summary>The ınstance net.</summary>
        /// <returns>The <see cref="ElasticsearchClient"/>.</returns>
        public static ElasticsearchClient InstanceNet(string ipaddres)
        {
            var ff = new ConnectionConfiguration(new Uri(ipaddres));
            return new ElasticsearchClient(ff);
        }

        /// <summary>The get data.</summary>
        /// <param name="url">The url.</param>
        /// <returns>The <see cref="string"/>.</returns>
        public static string GetData(string url)
        {
             var wc = new WebClient();
            return wc.DownloadString(new Uri(url));
        }

    }
}