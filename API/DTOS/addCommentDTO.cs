using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOS
{
    public class addCommentDTO
    {
        
        public int CarId {get;set;}
        public string SentFrom {get;set;}
        public string Message {get;set;}
    }
}