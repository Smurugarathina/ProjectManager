using System;
using DAL = ProjectManager.DL;
using System.Linq;
using NUnit.Framework;
using ProjectManagerService.Controllers;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using System.Web.Http.Results;
using System.Net;

namespace ProjectManager.NUnit
{
    [TestFixture]
    public class ProjectControllerTest : ApiController
    {

        [Test]
        public void GetProject()
        {
            // Set up Prerequisites 
            var controller = new ProjectController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            var response = controller.GetProject_Table(1);
            var res = Task.FromResult(response);
            Assert.IsInstanceOf<OkNegotiatedContentResult<DAL.Project_Table>>(response);
        }

        [Test]
        public void AddProject()
        {
            var controller = new ProjectController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            DAL.Project_Table prj = new DAL.Project_Table
            {
                end_date = DateTime.Now.AddDays(20),
                start_date = DateTime.Now,
                Project_name = "Test project2",
                manager_name = "test",
                priority = 20
            };

            IHttpActionResult actionResult = controller.PostProject_Table(prj);
            var createdResult = actionResult as CreatedAtRouteNegotiatedContentResult<DAL.Project_Table>;
            // Assert 

            Assert.IsNotNull(createdResult);
            Assert.AreEqual("DefaultApi", createdResult.RouteName);
            Assert.IsNotNull(createdResult.RouteValues["id"]);
        }



        [Test]
        public void UpdateProject()
        {
            var controller = new ProjectController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            DAL.Project_Table prj = new DAL.Project_Table
            {
                end_date = DateTime.Now.AddDays(20),
                start_date = DateTime.Now,
                Project_name = "Test project2",
                manager_name = "test",
                priority = 20,
                Project_id = 2006
            };

            IHttpActionResult actionResult = controller.PutProject_Table(2006, prj);
            var createdResult = actionResult as StatusCodeResult;
            // Assert 

            Assert.IsNotNull(createdResult);
            Assert.AreEqual(HttpStatusCode.NoContent, createdResult.StatusCode);
        }



        [Test]
        public void DeleteProject()
        {
            // Set up Prerequisites 

            var controller = new ProjectController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            var response = controller.DeleteProject_Table(2008);
            var res = Task.FromResult(response);
            Assert.IsInstanceOf<OkNegotiatedContentResult<DAL.Project_Table>>(response);
        }
    }
}
