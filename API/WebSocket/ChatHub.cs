using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;

namespace API
{
    public class ChatHub:Hub
    {
       
       public async Task WriteComment(string username,string message){
            await Clients.All.SendAsync("ReceiveComment",username, message);
        }
        public async Task SendMessage(string username,string message){
            await Clients.All.SendAsync("ReceiveMessage",username, message);
        }
    }
}