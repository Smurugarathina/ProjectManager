using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ProjectManager.DL;

namespace ProjectManagerService.Controllers
{
    public class ProjectController : ApiController
    {
        private ProjMagrEntities db = new ProjMagrEntities();

        // GET: api/Project
        public IQueryable<Project_Table> GetProject_Table()
        {
            return db.Project_Table;
        }

        // GET: api/Project/5
        [ResponseType(typeof(Project_Table))]
        public IHttpActionResult GetProject_Table(int id)
        {
            Project_Table project_Table = db.Project_Table.Find(id);
            if (project_Table == null)
            {
                return NotFound();
            }

            return Ok(project_Table);
        }

        // PUT: api/Project/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProject_Table(int id, Project_Table project_Table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != project_Table.Project_id)
            {
                return BadRequest();
            }

            db.Entry(project_Table).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Project_TableExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Project
        [ResponseType(typeof(Project_Table))]
        public IHttpActionResult PostProject_Table(Project_Table project_Table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Project_Table.Add(project_Table);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = project_Table.Project_id }, project_Table);
        }

        // DELETE: api/Project/5
        [ResponseType(typeof(Project_Table))]
        public IHttpActionResult DeleteProject_Table(int id)
        {
            Project_Table project_Table = db.Project_Table.Find(id);
            if (project_Table == null)
            {
                return NotFound();
            }

            db.Project_Table.Remove(project_Table);
            db.SaveChanges();

            return Ok(project_Table);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Project_TableExists(int id)
        {
            return db.Project_Table.Count(e => e.Project_id == id) > 0;
        }
    }
}