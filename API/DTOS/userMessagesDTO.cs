using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.DTOS
{
    public class userMessagesDTO
    {
        public List<Message> Messages{get;set;}
    }
}