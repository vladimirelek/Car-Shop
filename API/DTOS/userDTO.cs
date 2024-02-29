using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.DTOS
{
    public class userDTO
    {
        public int Id{get;set;}
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token {get;set;}
        public string Lokacija {get;set;}
        public int Tokeni {get;set;}
        public List<carDTO> Cars{get;set;}
        public List<Message> Messages {get;set;}
        
       
    }
}