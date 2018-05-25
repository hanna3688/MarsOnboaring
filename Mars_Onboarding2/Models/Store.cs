﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Mars_Onboarding2.Models
{
    public class Store
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "Store Name is required")]
        [StringLength(100)]
        public string Name { get; set; }
        [StringLength(300)]
        public string Address { get; set; }

        [ForeignKey("StoreId")]
        public virtual ICollection<ProductSold> ProductSolds { get; set; }
    }
}