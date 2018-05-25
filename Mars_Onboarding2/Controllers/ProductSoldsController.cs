using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Mars_Onboarding2.Models;

namespace Mars_Onboarding2.Controllers
{
    public class ProductSoldsController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: ProductSolds
        public ActionResult Index()
        {
            var productSolds = db.ProductSolds.Include(p => p.Customer).Include(p => p.Product).Include(p => p.Store);
            return View(productSolds.ToList());
        }

        public JsonResult GetSales()
        {
            using (db)
            {
                var productSolds = db.ProductSolds.Include(p => p.Customer).Include(p => p.Product).Include(p => p.Store);
                var data = productSolds.ToArray().Select(x => new {
                    Id = x.Id,
                    CustomerId = x.CustomerId,
                    CustomerName = x.Customer.Name,
                    ProductId = x.ProductId,
                    ProductName = x.Product.Name,
                    StoreId = x.StoreId,
                    StoreName = x.Store.Name,
                    DateSold = String.Format("{0:dd/MM/yyyy}", x.DateSold)
                })
                    .ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        // POST: ProductSolds/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Create(ProductSold productSold)
        {
            db.ProductSolds.Add(productSold);
            db.SaveChanges();

            return View();
        }

        // POST: ProductSolds/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Edit(ProductSold productSold)
        {
            if (ModelState.IsValid)
            {
                db.Entry(productSold).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(productSold);
        }

        // GET: ProductSolds/Delete/5
        /*
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ProductSold productSold = db.ProductSolds.Find(id);
            if (productSold == null)
            {
                return HttpNotFound();
            }
            return View(productSold);
        }*/

        // POST: ProductSolds/Delete/5
        [HttpPost]
        public ActionResult DeleteConfirmed(int id)
        {
            //int id = productSoldDelete.Id;
            Console.WriteLine(id);
            ProductSold productsold = db.ProductSolds.Find(id);
            db.ProductSolds.Remove(productsold);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult Test(int i)
        {
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
