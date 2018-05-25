using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Mars_Onboarding2.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "Customer Name is required")]
        [StringLength(100, MinimumLength = 3)]
        public string Name { get; set; }
        [StringLength(300)]
        public string Address { get; set; }

        [ForeignKey("CustomerId")]
        public virtual ICollection<ProductSold> ProductSolds { get; set; }
    }
}