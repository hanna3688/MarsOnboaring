namespace Mars_Onboarding2.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Mars_Onboarding2.Models;
    using System.Collections.Generic;

    internal sealed class Configuration : DbMigrationsConfiguration<Mars_Onboarding2.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Mars_Onboarding2.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.
            var customers = new List<Customer>
            {
                new Customer() { Id = 1, Name = "Ann", Address = "99 Queenstreet Auckland NZ"}
            };
            customers.ForEach(e => context.Customers.AddOrUpdate(p => p.Id, e));

            var products = new List<Product>
            {
                new Product() {Id = 1, Name = "Milk", Price= 3.99F }
            };
            products.ForEach(e => context.Products.AddOrUpdate(p => p.Id, e));

            var stores = new List<Store>
            {
                new Store() {Id = 1, Name = "Countdown", Address= "40 Queenstreet Auckland NZ"}
            };
            stores.ForEach(e => context.Stores.AddOrUpdate(p => p.Id, e));

            var productsolds = new List<ProductSold>
            {
                new ProductSold() {Id = 1, DateSold=new DateTime(2018,05,15), CustomerId = 1, ProductId = 1, StoreId = 1}
            };
            productsolds.ForEach(e => context.ProductSolds.AddOrUpdate(p => p.Id, e));
            context.SaveChanges();
            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
