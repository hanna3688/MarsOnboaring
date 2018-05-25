using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Mars_Onboarding2.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Product Name is required")]
        [StringLength(100)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Price is required")]
        [DataType(DataType.Currency, ErrorMessage = "Enter valid price")]
        public float? Price { get; set; }

        [ForeignKey("ProductId")]
        public virtual ICollection<ProductSold> ProductSolds { get; set; }
    }
}