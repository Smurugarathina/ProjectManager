﻿using System;
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
    public class UserController : ApiController
    {
        private ProjMagrEntities db = new ProjMagrEntities();

        // GET: api/User
        public IQueryable<UserTable> GetUserTables()
        {
            return db.UserTables;
        }

        // GET: api/User/5
        [ResponseType(typeof(UserTable))]
        public IHttpActionResult GetUserTable(int id)
        {
            UserTable userTable = db.UserTables.Find(id);
            if (userTable == null)
            {
                return NotFound();
            }

            return Ok(userTable);
        }

        // PUT: api/User/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserTable(int id, UserTable userTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userTable.user_id)
            {
                return BadRequest();
            }

            db.Entry(userTable).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserTableExists(id))
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

        // POST: api/User
        [ResponseType(typeof(UserTable))]
        public IHttpActionResult PostUserTable(UserTable userTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserTables.Add(userTable);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = userTable.user_id }, userTable);
        }

        // DELETE: api/User/5
        [ResponseType(typeof(UserTable))]
        public IHttpActionResult DeleteUserTable(int id)
        {
            UserTable userTable = db.UserTables.Find(id);
            if (userTable == null)
            {
                return NotFound();
            }

            db.UserTables.Remove(userTable);
            db.SaveChanges();

            return Ok(userTable);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserTableExists(int id)
        {
            return db.UserTables.Count(e => e.user_id == id) > 0;
        }
    }
}