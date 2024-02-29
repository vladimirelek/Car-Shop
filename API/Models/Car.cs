using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string Proizvodjac {get;set;}
        public int Cijena {get;set;}
        public string Slika {get;set;}
        public string Gorivo {get;set;}
        public int Godiste {get;set;}
        public string Model {get;set;}
        public int Kilometraza {get;set;}
        public double Kubikaza {get;set;}
        public int BrojVrata {get;set;}
        public double SnagaMotora {get;set;}
        public bool Featured {get;set;}
        public int UserId {get;set;}
        public User User {get;set;}
        public List<Comment>? Komentari{get;set;}
        [NotMapped]
        public IFormFile AddedPhoto {get;set;}
        

    }
}