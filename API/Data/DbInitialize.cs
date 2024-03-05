using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
namespace API.Data
{
    public static class DbInitialize
    {
        public static async Task Initialize(DataContext context,UserManager<User> userManager,IMapper mapper){
            
            if (!userManager.Users.Any()){
            var admin = new User{
              UserName="vladimir",
              Email="vladimir@gmail.com", 
              Lokacija="Istocno Sarajevo",
              Tokeni=50,  
            };
            await userManager.CreateAsync(admin,"Pa$$w0rd");
            await userManager.AddToRoleAsync(admin,"Admin");
             var userp = new User{
              UserName="petar32",
              Email="petar@gmail.com",
              Lokacija="Bijeljina",
              Tokeni=50,            
            };
            await userManager.CreateAsync(userp,"Pa$$w0rd");
            await userManager.AddToRoleAsync(userp,"Member");
            var userm = new User{
              UserName="milan2001",
              Email="milan@gmail.com",
              Lokacija="Sarajevo",
              Tokeni=50,
            };
            await userManager.CreateAsync(userm,"Pa$$w0rd");
            await userManager.AddToRoleAsync(userm,"Member");
            } 
            if (!context.AllCars.Any()){
                var user1 = await userManager.FindByNameAsync("petar32");
                var user2=await userManager.FindByNameAsync("milan2001");
                
                var cars=new List<Car>{
                    new Car{
                        Proizvodjac="Nissan",
                        Model="NV200",
                        Godiste=2018,
                        Kilometraza=60000,
                        Kubikaza=2.0,
                        SnagaMotora=110,
                        BrojVrata=2,
                        Gorivo="Dizel",
                        Slika="nissan.jpg",
                        Cijena=12000,
                        Featured=false,
                        User=user1
                        
                                         
                    },
                    new Car{
                        Proizvodjac="Ford",
                        Model="Kuga",
                        Godiste=2018,
                        Kilometraza=68000,
                        Kubikaza=2.0,
                        SnagaMotora=110,
                        BrojVrata=4,
                        Gorivo="Dizel",
                        Slika="ford.jpg",
                        Cijena=38700,
                        Featured=false,
                        User=user2           
                       },
                    
                    new Car{
                        Proizvodjac="Citroen",
                        Model="C1",
                        Godiste=2013,
                        Kilometraza=134000,
                        Kubikaza=1.0,
                        SnagaMotora=50,
                        BrojVrata=2,
                        Gorivo="Benzin",
                        Slika="citroen.jpg",
                        Cijena=8000,
                        Featured=false,
                        User=user1
                    
                    },
                    new Car{
                        Proizvodjac="Land Rover",
                        Model="Range Rover",
                        Godiste=2023,
                        Kilometraza=20,
                        Kubikaza=3.0,
                        SnagaMotora=258,
                        BrojVrata=4,
                        Gorivo="Dizel",
                        Slika="range.jpg",
                        Cijena=100000,
                        Featured=false,
                        User=user2
                    },
                    new Car{
                        Proizvodjac="Opel",
                        Model="Meriva",
                        Godiste=2013,
                        Kilometraza=226000,
                        Kubikaza=1.4,
                        SnagaMotora=88,
                        BrojVrata=4,
                        Gorivo="Plin",
                        Slika="opel.jpg",
                        Cijena=12500,
                        Featured=false,
                        User=user1
                                      },
                    new Car{
                        Proizvodjac="Seat",
                        Model="Altea",
                        Godiste=2011,
                        Kilometraza=300000,
                        Kubikaza=1.6,
                        SnagaMotora=77,
                        BrojVrata=4,
                        Gorivo="Dizel",
                        Slika="seat.jpg",
                        Cijena=4200,
                        Featured=true,
                        User=user1                   
                    },
                    new Car{
                        Proizvodjac="Audi",
                        Model="A4",
                        Godiste=2019,
                        Kilometraza=140000,
                        Kubikaza=2.0,
                        SnagaMotora=140,
                        BrojVrata=4,
                        Gorivo="Dizel",
                        Slika="audi.jpg",
                        Cijena=50000,
                        Featured=true,
                       User=user2
                        
                    },
                    new Car{
                        Proizvodjac="BMW",
                        Model="X5",
                        Godiste=2014,
                        Kilometraza=236840,
                        Kubikaza=3.0,
                        SnagaMotora=190,
                        BrojVrata=4,
                        Gorivo="Dizel",
                        Slika="bmw.jpg",
                        Cijena=67900,
                        Featured=true,
                       User=user2
                    },
                    new Car{
                        Proizvodjac="Volvo",
                        Model="V90",
                        Godiste=2019,
                        Kilometraza=241840,
                        Kubikaza=2.0,
                        SnagaMotora=110,
                        BrojVrata=4,
                        Gorivo="Dizel",
                        Slika="volvo.jpg",
                        Cijena=59000,
                        Featured=true,
                       User=user1
                    },
                    new Car{
                        Proizvodjac="Volkswagen",
                        Model="Tiguan",
                        Godiste=2014,
                        Kilometraza=170000,
                        Kubikaza=2.0,
                        SnagaMotora=132,
                        BrojVrata=4,
                        Gorivo="Dizel",
                        Slika="volkswagen.jpg",
                        Cijena=34500,
                        Featured=true,
                        User=user1
                        
                    },
                    new Car{
                        Proizvodjac="Peugeot",
                        Model="3008",
                        Godiste=2018,
                        Kilometraza=173696,
                        Kubikaza=1.6,
                        SnagaMotora=88,
                        BrojVrata=4,
                        Gorivo="Dizel",
                        Slika="peugeot.jpg",
                        Cijena=33800,
                        Featured=true,
                        User=user2
                        
                    },
                    new Car{
                        Proizvodjac="Skoda",
                        Model="Octavia",
                        Godiste=2012,
                        Kilometraza=248000,
                        Kubikaza=1.6,
                        SnagaMotora=77,
                        BrojVrata=4,
                        Gorivo="Dizel",
                        Slika="skoda.jpg",
                        Cijena=14900,
                        Featured=true,
                        User=user2
                        
                    },
                    new Car{
                        Proizvodjac="Volkswagen",
                        Model="Golf",
                        Godiste=2016,
                        Kilometraza=148542,
                        Kubikaza=2.0,
                        SnagaMotora=169,
                        BrojVrata=4,
                        Gorivo="Benzin",
                        Slika="golf.jpg",
                        Cijena=18000,
                        Featured=true,
                        User=user2
                        
                    },
                    new Car{
                        Proizvodjac="Porsche",
                        Model="Cayenne",
                        Godiste=2015,
                        Kilometraza=19000,
                        Kubikaza=4.2,
                        SnagaMotora=283,
                        BrojVrata=4,
                        Gorivo="Dizel",
                        Slika="porsche.jpg",
                        Cijena=85000,
                        Featured=true,
                        User=user1
                        
                    },
                    new Car{
                        Proizvodjac="Smart",
                        Model="ForTwo",
                        Godiste=2015,
                        Kilometraza=130000,
                        Kubikaza=0.9,
                        SnagaMotora=90,
                        BrojVrata=2,
                        Gorivo="Benzin",
                        Slika="smart.jpg",
                        Cijena=22000,
                        Featured=false,
                       User=user1
                        
                    },
                    new Car{
                        Proizvodjac="Volkswagen",
                        Model="Touran",
                        Godiste=2015,
                        Kilometraza=260870,
                        Kubikaza=1.6,
                        SnagaMotora=77,
                        BrojVrata=4,
                        Gorivo="Dizel",
                        Slika="touran.jpeg",
                        Cijena=24999,
                        Featured=false,
                        User=user2
                        
                    },
                    new Car{
                        Proizvodjac="Toyota",
                        Model="Land Cruiser",
                        Godiste=2018,
                        Kilometraza=160000,
                        Kubikaza=2.8,
                        SnagaMotora=130,
                        BrojVrata=4,
                        Gorivo="Dizel",
                        Slika="toyota.jpg",
                        Cijena=79800,
                        Featured=false,
                        User=user2
                        
                    },
                    new Car{
                        Proizvodjac="Volkswagen",
                        Model="Polo",
                        Godiste=2013,
                        Kilometraza=211000,
                        Kubikaza=1.6,
                        SnagaMotora=77,
                        BrojVrata=4,
                        Gorivo="Dizel",
                        Slika="polo.jpg",
                        Cijena=14650,
                        Featured=false,
                        User=user1
                        
                    },
                    new Car{
                        Proizvodjac="Mitsubishi",
                        Model="L200",
                        Godiste=2012,
                        Kilometraza=250000,
                        Kubikaza=2.5,
                        SnagaMotora=132,
                        BrojVrata=4,
                        Gorivo="Dizel",
                        Slika="mitsubishi.jpg",
                        Cijena=44000,
                        Featured=false,
                        User=user1
                        
                    },
                    new Car{
                        Proizvodjac="Audi",
                        Model="Q8",
                        Godiste=2019,
                        Kilometraza=76000,
                        Kubikaza=3.0,
                        SnagaMotora=210,
                        BrojVrata=4,
                        Gorivo="Dizel",
                        Slika="audiq8.jpeg",
                        Cijena=135000,
                        Featured=false,
                        User=user1
                        
                    },
                    new Car{
                        Proizvodjac="Suzuki",
                        Model="SJ Samurai",
                        Godiste=1985,
                        Kilometraza=100000,
                        Kubikaza=1.3,
                        SnagaMotora=44,
                        BrojVrata=2,
                        Gorivo="Benzin",
                        Slika="suzuki.jpeg",
                        Cijena=11900,
                        Featured=false,
                        User=user1
                        
                    },


                };
                
                foreach (var car in cars)
                {
                    context.AllCars.Add(car);
                    
                }
                context.SaveChanges();

                
            }
            
        }  
         
          
    }
}