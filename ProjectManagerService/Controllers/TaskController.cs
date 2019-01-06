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
    public class TaskController : ApiController
    {
        private ProjMagrEntities db = new ProjMagrEntities();

        // GET: api/Task
        public IQueryable<Task_Table> GetTask_Table()
        {
            return db.Task_Table;
        }

        // GET: api/Task/5
        [ResponseType(typeof(Task_Table))]
        public IHttpActionResult GetTask_Table(int id)
        {
            Task_Table task_Table = db.Task_Table.Find(id);
            if (task_Table == null)
            {
                return NotFound();
            }

            return Ok(task_Table);
        }

        // PUT: api/Task/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTask_Table(int id, Task_Table task_Table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != task_Table.Task_id)
            {
                return BadRequest();
            }

            db.Entry(task_Table).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Task_TableExists(id))
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

        // POST: api/Task
        [ResponseType(typeof(Task_Table))]
        public IHttpActionResult PostTask_Table(Task_Table task_Table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Task_Table.Add(task_Table);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = task_Table.Task_id }, task_Table);
        }

        // DELETE: api/Task/5
        [ResponseType(typeof(Task_Table))]
        public IHttpActionResult DeleteTask_Table(int id)
        {
            Task_Table task_Table = db.Task_Table.Find(id);
            if (task_Table == null)
            {
                return NotFound();
            }

            db.Task_Table.Remove(task_Table);
            db.SaveChanges();

            return Ok(task_Table);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Task_TableExists(int id)
        {
            return db.Task_Table.Count(e => e.Task_id == id) > 0;
        }
    }
}