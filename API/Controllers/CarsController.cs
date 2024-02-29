using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using API.Services;
using AutoMapper;
using API.Data;
using Microsoft.EntityFrameworkCore;
using API.DTOS;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Authorization;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController:ControllerBase
    {
        private static UserManager<User> _userManager;
        private static IMapper _mapper;
        private static TokenService _tokenService;
        private static DataContext _context;
        private static IWebHostEnvironment _webHostEnvironment;
        public CarsController(UserManager<User> userManager,IMapper mapper,TokenService tokenService,DataContext context,IWebHostEnvironment webHostEnvironment)
        {
            _userManager=userManager;
            _mapper=mapper;
            _tokenService=tokenService;
            _context=context;
            _webHostEnvironment=webHostEnvironment;
        }
          
[HttpGet("getAllCars")]
public async Task<ActionResult<List<carDTO>>> GetAllCars([FromQuery] ProductParams productParams)
{
    var query =  _context.AllCars.Include(c=>c.User).Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Fuel,productParams.Proizvodjac,productParams.ProizvodnjaOd,productParams.ProizvodnjaDo).AsQueryable();

   
    var cars=await PagedList<Car>.ToPagedList(query,productParams.PageNumber,productParams.PageSize);
    Response.AddPaginationHeader(cars.MetaData);
    var carDTOs = _mapper.Map<List<carDTO>>(cars);
    foreach(var carDTO in carDTOs){
                var matchingCar=cars.FirstOrDefault(c => c.Id == carDTO.Id);
                if (matchingCar != null)
        {
                carDTO.Username = matchingCar.User?.UserName;
                carDTO.UserId=matchingCar.UserId;
                carDTO.Lokacija=matchingCar.User.Lokacija;
                carDTO.Tokeni=matchingCar.User.Tokeni;
                
        }
    }
    return carDTOs;
    
}
        
        [HttpGet("getFeaturedCars")]
        public async Task<ActionResult<List<carDTO>>> GetFeatuedCars(){
            var cars = await _context.AllCars.Include(c=>c.User).Where(c=>c.Featured==true).ToListAsync();
            if (cars==null) return NotFound();
            var carDTOs = _mapper.Map<List<carDTO>>(cars);
            foreach(var carDTO in carDTOs){
                var matchingCar=cars.FirstOrDefault(c => c.Id == carDTO.Id);
                if (matchingCar != null){
                    carDTO.Username = matchingCar.User?.UserName;
                }
                
            }
            return carDTOs;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<carDTO>> GetCarById(int id){
         var car= await _context.AllCars.Include(c=>c.User).Include(c=>c.Komentari).FirstOrDefaultAsync(c=>c.Id==id);
         if (car==null) return NotFound();
        var carDto= _mapper.Map<carDTO>(car);
        carDto.Username = car.User?.UserName;  
        carDto.Lokacija=car.User.Lokacija;  
        return carDto;
        }
        [Authorize]
        [HttpPut("addComment")]
        public async Task<ActionResult<carDTO>> AddComment (addCommentDTO comment){
         var car=  await _context.AllCars.FirstOrDefaultAsync(c=>c.Id==comment.CarId);
         if (car==null) return NotFound();
         if (car.Komentari == null){
    
            car.Komentari = new List<Comment>();
        }
            var noviKomentar=new Comment{
                SentFrom=comment.SentFrom,
                Message=comment.Message,
            };
            car.Komentari.Add(noviKomentar);
            await _context.SaveChangesAsync();
            var mappedCar=_mapper.Map<carDTO>(car);
            return mappedCar;

        }
        [Authorize]
        [HttpDelete("{carId}/{commentId}")]
        public async Task<ActionResult<carDTO>> DeleteComment (int carId,int commentId){
            var car=  await _context.AllCars.Include(c=>c.Komentari).FirstOrDefaultAsync(c=>c.Id==carId);
         if (car==null ) return NotFound();
        var komentar=car.Komentari?.FirstOrDefault(k=>k.CommentId==commentId);
        if (komentar==null) return NotFound();
        car.Komentari?.Remove(komentar);
        await _context.SaveChangesAsync();
        var mappedCar=_mapper.Map<carDTO>(car);
        return mappedCar;
        }
        [Authorize]
        [HttpPost("addNewCar")]
        public async Task<ActionResult<carDTO>> AddCar ([FromForm]addCarDTO newCar){
            if (newCar.AddedPhoto!=null){
                string folder="slike/";
                folder+=newCar.AddedPhoto.FileName;
                string serverFolder = Path.Combine(Directory.GetCurrentDirectory() ,folder);
                await newCar.AddedPhoto.CopyToAsync(new FileStream(serverFolder,FileMode.Create));
                newCar.Slika=newCar.AddedPhoto.FileName;
            }
            
            var car=_mapper.Map<Car>(newCar);
            _context.AllCars.Add(car);
           await _context.SaveChangesAsync();
           var carDto=_mapper.Map<carDTO>(car);
           return carDto;
        }
        [HttpGet("getImage{imageName}")]
    public IActionResult GetImage(string imageName)
    {
        try
        {
            string folder = "slike";
            string imagePath = Path.Combine(Directory.GetCurrentDirectory(), folder, imageName);

            if (System.IO.File.Exists(imagePath))
            {
                return PhysicalFile(imagePath, "image/jpg");
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    [HttpDelete("deleteImage{imageName}")]
    public IActionResult DeleteImage(string imageName)
{
    try
    {
        string folder = "slike";
        string imagePath = Path.Combine(Directory.GetCurrentDirectory(), folder, imageName);

        if (System.IO.File.Exists(imagePath))
        {
            System.IO.File.Delete(imagePath);
            return Ok(); 
        }
        else
        {
            return NotFound();
        }
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}

    [HttpDelete("{carId}")]
    public async Task<ActionResult<carDTO>> DeleteCar (int carId){
        try
        {
            var selectedCar = await _context.AllCars.FindAsync(carId);
            if (selectedCar==null) return NotFound();
            DeleteImage(selectedCar.Slika);
            _context.AllCars.Remove(selectedCar);
            await _context.SaveChangesAsync();
            var deletedCar=_mapper.Map<carDTO>(selectedCar);
            return deletedCar;
        }
        catch (Exception ex)
        {
            
            return StatusCode(500,$"Internal server error: {ex.Message}");
        }

    }
    [HttpPut("FeaturedCar")]
    public async Task<ActionResult<carDTO>> FeaturedCar(addFeaturedCarDTO addFeaturedCardto){
        var car= await _context.AllCars.FirstOrDefaultAsync(c=>c.Id==addFeaturedCardto.carId);
         if (car==null) return NotFound();
         if(!car.Featured){
            car.Featured=true;
         }
         else{
            car.Featured=false;
         }
         await _context.SaveChangesAsync();
       await GetFeatuedCars();
        var carDto= _mapper.Map<carDTO>(car); 
        return carDto;
    }
}
        
          
}
