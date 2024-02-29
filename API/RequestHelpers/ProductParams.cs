using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    public class ProductParams:PaginationParams
    {
        public string Proizvodjac {get;set;}
        public string OrderBy {get;set;}
        public string SearchTerm {get;set;}
        public string Fuel {get;set;}
        public int ProizvodnjaOd {get;set;}=0;
        public int ProizvodnjaDo{get;set;}=0;

    }
}