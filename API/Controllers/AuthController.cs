using API.Data;
using API.DTOS;
using API.Models;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController:ControllerBase
    {
        private static UserManager<User> _userManager;
        private static IMapper _mapper;
        private static TokenService _tokenService;
        private static DataContext _context;
        public AuthController(UserManager<User> userManager,IMapper mapper,TokenService tokenService,DataContext context)
        {
            _userManager=userManager;
            _mapper=mapper;
            _tokenService=tokenService;
            _context=context;
        }
        [HttpPost ("login")]
        public async Task<ActionResult<userDTO>> Login(loginDTO loginDTO){
            var user = await _userManager.Users
    .Include(u => u.Messages)
    .FirstOrDefaultAsync(u => u.UserName == loginDTO.Username);
            if (user==null || !await _userManager.CheckPasswordAsync(user,loginDTO.Password) ){
                    return Unauthorized();
            }
            var token=await _tokenService.generateToken(user);
            var userToReturn=new userDTO{
                Id=user.Id,
                Username=user.UserName,
                Email=user.Email,
                Token=token,
                Lokacija=user.Lokacija,
                Tokeni=user.Tokeni,
                Messages=user.Messages
            };
            return userToReturn;
        }
        [HttpPost("register")]
        public async Task<ActionResult> Register (registerDTO registerDTO){
            var newUser =new User{
                Email=registerDTO.Email,
                UserName=registerDTO.Username,
                Lokacija=registerDTO.Lokacija,
                Tokeni=50,
                Messages=registerDTO.Messages
            };

            var result=await _userManager.CreateAsync(newUser,registerDTO.Password);
            if (!result.Succeeded) {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code,error.Description);
                }
                return ValidationProblem();
            }
            var user=_mapper.Map<userDTO>(newUser);
            return StatusCode(201);
        }
        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<userDTO>> CurrentUser(){
            var user = await _userManager.Users
        .Include(u => u.Messages)
        .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
            if (user==null ){
                    return Unauthorized();
            }
            
            return new userDTO{
                Id=user.Id,
                Username=user.UserName,
                Email=user.Email,
                Token=await _tokenService.generateToken(user),
                Lokacija=user.Lokacija,
                Tokeni=user.Tokeni,
                Messages=user.Messages
            };
            
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<userDTO>> GetUserById(int id){
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user==null) return NotFound();
            var cars=await _context.AllCars.Where(c=>c.UserId==user.Id).ToListAsync();
            var mappedCars=_mapper.Map <List<carDTO>>(cars);
            var mappedUser=_mapper.Map<userDTO>(user);
            mappedUser.Cars=mappedCars;
            return mappedUser;
        }  
        [HttpPost("addMessageToInbox")]
        public async Task AddMessage(sendMessageDTO addMessageDto){
            var allUsers = await _userManager.Users.ToListAsync();
            
            foreach (var user in allUsers){
                var message=_mapper.Map<Message>(addMessageDto);
                user.Messages.Add(message);
                
            }
            await _context.SaveChangesAsync();
            
        }
        [HttpGet("getAllMessages/{userId}")]
        public async Task<ActionResult<userMessagesDTO>> GetUserMessages(int userId){
          var user= await _userManager.Users.Include(u=>u.Messages).FirstOrDefaultAsync(u=>u.Id==userId);
          if (user==null){
            return NotFound();
          }
            var mappedUser=_mapper.Map<userMessagesDTO>(user);
            return mappedUser;
    

        }
        [HttpDelete("deleteMessage/{userId}/{messageId}")]
        public async Task<ActionResult<userMessagesDTO>> DeleteMessage(int userId,int messageId){
            var user=await _userManager.Users.Include(u=>u.Messages).FirstOrDefaultAsync(u=>u.Id==userId);
            var message=user?.Messages.FirstOrDefault(m=>m.MessageId==messageId);
            user.Messages.Remove(message);
            await _userManager.UpdateAsync(user);
            var mappedUser=_mapper.Map<userMessagesDTO>(user);
            return mappedUser;
        }

        
    }
}