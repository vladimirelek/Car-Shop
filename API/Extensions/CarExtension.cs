using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Extensions
{
    public static class CarExtension
    {
        public static IQueryable<Car> Sort(this IQueryable<Car> query,string orderBy){
            if (string.IsNullOrWhiteSpace(orderBy)) return query;
            
            query = orderBy switch
        {
            "cijena"=>query.OrderBy(c=>c.Cijena),
            "opadajucaCijena"=>query.OrderByDescending(c=>c.Cijena),
            _ => query.OrderBy(c => c.Cijena)
        };
        return query;
        }
        public static IQueryable<Car> Search (this IQueryable<Car> query, string searchTerm){
            
            if (string.IsNullOrWhiteSpace(searchTerm)) return query;
            var lowerCaseSearch=searchTerm.Trim().ToLower();
            return query.Where(c=>c.Proizvodjac.ToLower().Contains(lowerCaseSearch));
            
        }
        public static IQueryable<Car> Filter (this IQueryable<Car> query, string gorivo,string proizvodjac,int proizvodnjaOd,int proizvodnjaDo){
            if (string.IsNullOrWhiteSpace(gorivo) && string.IsNullOrWhiteSpace(proizvodjac) && (proizvodnjaOd==0 || proizvodnjaDo==0)) return query;
            var gorivoList=new List<string>();
            var proizvodjacList=new List<string>();
            if (!string.IsNullOrEmpty(gorivo)){
                gorivoList.AddRange(gorivo.ToLower().Split(",").ToList());
            }
            if (!string.IsNullOrEmpty(proizvodjac)){
                proizvodjacList.AddRange(proizvodjac.ToLower().Split(",").ToList());
            }
            query=query.Where(c=>proizvodjacList.Count==0 || proizvodjacList.Contains(c.Proizvodjac.ToLower()));
            query=query.Where(c=>gorivoList.Count==0 || gorivoList.Contains(c.Gorivo.ToLower()));
            if (proizvodnjaOd!=0 && proizvodnjaDo!=0){
                query=query.Where(c=>c.Godiste>=proizvodnjaOd && c.Godiste<=proizvodnjaDo );
            }
            
            return query;

        }
    }
}