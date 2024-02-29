using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public string SentFrom {get;set;}
        public string MessageContent {get;set;}
    }
}