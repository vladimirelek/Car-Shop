using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.DTOS
{
    public class addCarDTO
    {
        public string Proizvodjac {get;set;}
        public int Cijena {get;set;}
        public string? Slika {get;set;}
        public string Gorivo {get;set;}
        public int Godiste {get;set;}
        public string Model {get;set;}
        public int Kilometraza {get;set;}
        public double Kubikaza {get;set;}
        public int BrojVrata {get;set;}
        public double SnagaMotora {get;set;}
        public int UserId {get;set;}
        [NotMapped]
        public IFormFile AddedPhoto {get;set;}
        
    }
}