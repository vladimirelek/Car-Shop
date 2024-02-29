using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class User:IdentityUser<int>
    {
        public List<Car> Cars {get;set;}
        public string Lokacija {get;set;}
        public int Tokeni {get;set;}
        public List<Message> Messages{get;set;}= new List<Message>();
        

        
        
    }
}