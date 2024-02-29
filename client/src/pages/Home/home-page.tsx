import { useEffect } from "react";
import "./home-style.css";
import { Skeleton } from "@mui/material";
import FeaturedCarsCards from "../../components/FeaturedCard/car-card";
import { useAppDispatch } from "../../redux/store";
import { useAppSelector } from "../../redux/store";
import { fetchFeaturedCars } from "../../features/CarsAction/carsSlice";
import Loading from "../../components/Loading/loading";
const Home = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((store) => store.cars);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchFeaturedCars());
      } catch (error) {
        console.error(
          "Greška prilikom dohvatanja podataka o automobilima:",
          error
        );
      }
    };

    fetchData();
  }, []);

  const selectorUser = useAppSelector((content) => content.auth.user);
  const cars = selector.featuredCars;
  if (!selector.featuredCarsStatus) return <Loading />;
  return (
    <div className="home-container">
      <div className="car-list">
        {cars?.map((car) => (
          <div>
            {selector.featuredCarsStatus ? (
              <FeaturedCarsCards
                id={car.id}
                proizvodjac={car.proizvodjac}
                model={car.model}
                slika={car.slika}
                godiste={car.godiste}
                gorivo={car.gorivo}
                cijena={car.cijena}
                username={car.username}
              />
            ) : (
              <Skeleton width={365} height={450} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
