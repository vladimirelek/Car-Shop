using System.Text;
using System.Text.Json.Serialization;
using API;
using API.Data;
using API.Mapping;
using API.Models;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddControllers(
    options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);
builder.Services.AddDbContext<DataContext>(
    options=>options.UseSqlite(builder.Configuration.GetConnectionString("SQLiteConnection"))
);
builder.Services.AddSignalR();
builder.Services.AddIdentityCore<User>()
.AddRoles<Role>()
.AddEntityFrameworkStores<DataContext>();
builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey =  new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"])),
            ValidateIssuer = false, 
            ValidateAudience = false, 
            ValidateLifetime=true,
        };
    }
);
builder.Services.AddCors();


builder.Services.AddAuthorization();
builder.Services.AddScoped<TokenService>();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c=>{
    var jwtSecurityScheme=new OpenApiSecurityScheme{
        BearerFormat="JWT",
        Name="Authorization",
        In=ParameterLocation.Header,
        Type=SecuritySchemeType.ApiKey,
        Scheme=JwtBearerDefaults.AuthenticationScheme,
        Reference=new OpenApiReference{
            Id=JwtBearerDefaults.AuthenticationScheme,
            Type=ReferenceType.SecurityScheme
        }
    };
    c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id,jwtSecurityScheme);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement{
        {
            jwtSecurityScheme,Array.Empty<string>()
        }
    });
});

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c=>c.ConfigObject.AdditionalItems.Add("persistAuthorization","true"));
}
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors(opt=>{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000","http://localhost:3001");
});
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapControllers();
app.MapHub<ChatHub>("/chat");
var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<DataContext>();
var mapper=scope.ServiceProvider.GetRequiredService<IMapper>();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
await DbInitialize.Initialize(context,userManager,mapper);

app.Run();
