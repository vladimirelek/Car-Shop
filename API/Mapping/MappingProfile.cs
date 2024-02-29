using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOS;
using API.Models;
using API.RequestHelpers;
using AutoMapper;

namespace API.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<User, userDTO>();
            CreateMap<Car, carDTO>();
            CreateMap<PagedList<Car>,carDTO>();
            CreateMap<addCarDTO,Car>();
            CreateMap<User,userMessagesDTO>();
            CreateMap<sendMessageDTO,Message>();
            
        }
    }
}