using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
namespace API.DTOS
{
    public class registerDTO
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Lokacija{get;set;}
        public int Tokeni {get;set;}
        public List<Message> Messages {get;set;}= new List<Message>();
    }
}