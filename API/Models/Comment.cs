using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Comment
    {
        public int CommentId {get;set;}
        public string SentFrom {get;set;}
        public string Message {get;set;}
    }
}