using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication52.Controllers
{
    using System.Net;
    using System.Text;

    using MvcApplication52.Common;

    using Nest;

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var statusResponse = ElasticSearchManager.Instance("http://localhost:9200/").ClusterState();

            return View(statusResponse);
        }

        public ActionResult Browser()
        {

            return View();
        }
        public ActionResult About()
        {
            return this.View();
        }
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult spview()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Contact1()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult GetCategoryById(int id)
        {

            return this.Json(new[]
                                 {
                                     new { key = 6005, value = "Konut" },
                                     new { key = 6007, value = "İşyeri" },
                                     new { key = 6009, value = "Arsa" },
                                     new { key = 6010, value = "Devremülk" }
                                 }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Cpu()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

    }
}
