using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public  class TokenService
    {
        private  readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        public TokenService(IConfiguration configuration,UserManager<User> userManager)
        {
            _configuration=configuration;
            _userManager=userManager;
        }
        public  async Task<string> generateToken(User user){
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]!));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512);

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Email, user.Email),
          
        };
         var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

        var token = new JwtSecurityToken(
            issuer:null,
            audience:null,
            claims:claims,
            expires: DateTime.UtcNow.AddHours(24), // Vrijeme isteka tokena (npr. 1 sat)
            signingCredentials: credentials
        );

        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }
        
    }
}