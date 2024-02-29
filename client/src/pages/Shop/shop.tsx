import "./shop-style.css";

import { useEffect } from "react";
import AllCarsCards from "../../components/AllCarsCard/allCars";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  FormControl,
  InputLabel,
  Select,
  Button,
  Skeleton,
} from "@mui/material";
import {
  fetchCars,
  setFilters,
  setPageNumber,
} from "../../features/CarsAction/carsSlice";
import RadioButtons from "../../components/RadioButtonGroup/radioButtons";
import Search from "../../features/CarsAction/Search/search";
import ComboBoxProizvodjac from "../../components/ComboBox/comboBox";
import ComboBoxGorivo from "../../components/ComboBox/comboBoxGorivo";
import ComboBoxYear1 from "../../components/ComboBox/comboBoxYear1";
import AppPagination from "../../components/Pagination/AppPagination";
import Loading from "../../components/Loading/loading";

const Shop = () => {
  const sortOptions = [
    { value: "cijena", label: "Najjeftinije" },
    { value: "opadajucaCijena", label: "Najskuplje" },
    { value: "", label: "Standardno" },
  ];
  const gorivo = ["Benzin", "Dizel", "Plin", "Elektricni"];
  const proizvodjaci = [
    "BMW",
    "Audi",
    "Opel",
    "Mazda",
    "Toyota",
    "Nissan",
    "Volkswagen",
    "Renault",
    "Citroen",
    "Ford",
    "Land Rover",
    "Seat",
    "Volvo",
    "Peugeot",
    "Skoda",
    "Porsche",
    "Smart",
  ];

  const years = [
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
  ];
  const fuel = [
    { label: 0 },
    { label: 50000 },
    { label: 100000 },
    { label: 150000 },
    { label: 200000 },
    { label: 250000 },
    { label: 300000 },
    { label: "300000 +" },
  ];
  const dispatch = useAppDispatch();
  const selector = useAppSelector((store) => store.cars);
  const allCars = selector.cars;
  const filters = selector.filters;
  const metaData = selector.metaData;
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCars());
      } catch (error) {
        console.error(
          "Greška prilikom dohvatanja podataka o automobilima:",
          error
        );
      }
    };

    fetchData();
  }, [dispatch]);
  return (
    <div className="shop-container">
      <Search />

      <RadioButtons
        sortOptions={sortOptions}
        selectedValue={filters.orderBy}
        onChange={async (e: any) => {
          dispatch(setFilters({ orderBy: e.target.value }));
          await dispatch(fetchCars());
        }}
      />

      <div className="mainContainer">
        <div className="allFilters">
          <ComboBoxProizvodjac
            value={selector.filters.proizvodjac}
            onChange={async (e: any) => {
              dispatch(setFilters({ proizvodjac: e.target.value }));
              await dispatch(fetchCars());
            }}
            proizvodjaci={proizvodjaci}
          />
          <ComboBoxGorivo
            value={selector.filters.fuel}
            gorivo={gorivo}
            onChange={async (e: any) => {
              dispatch(setFilters({ fuel: e.target.value }));
              await dispatch(fetchCars());
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Godina proizvodnje
            </InputLabel>
            <Select
              className="combo2"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Godina proizvodnje"
            >
              <ComboBoxYear1
                years={years}
                onChange1={(event: any) => {
                  dispatch(setFilters({ proizvodnjaOd: event.target.value }));
                }}
                onChange2={(event: any) => {
                  dispatch(setFilters({ proizvodnjaDo: event.target.value }));
                }}
              />
            </Select>
          </FormControl>
        </div>
        <div className="dugmeFilter">
          <Button
            variant="outlined"
            color="inherit"
            onClick={async () => {
              dispatch(
                setFilters({
                  orderBy: "cijena",
                  fuel: "",
                  proizvodjac: "",
                  proizvodnjaDo: 0,
                  proizvodnjaOd: 0,
                })
              );
              await dispatch(fetchCars());
            }}
          >
            Default
            <FilterAltIcon />
          </Button>
        </div>
        {selector.status ? (
          <div className="allCards">
            {allCars.map((car) => (
              <div>
                {!selector.status ? (
                  <Skeleton variant="rectangular" width={365} height={450} />
                ) : (
                  <AllCarsCards
                    proizvodjac={car.proizvodjac}
                    model={car.model}
                    slika={car.slika}
                    godiste={car.godiste}
                    gorivo={car.gorivo}
                    cijena={car.cijena}
                    username={car.username}
                    id={car.id}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ position: "relative", minHeight: "100vh" }}>
            <Loading />
          </div>
        )}
      </div>

      <div className="pagination">
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={async (page: number) => {
              dispatch(setPageNumber({ pageNumber: page }));

              await dispatch(fetchCars());
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />
        )}
      </div>
    </div>
  );
};
export default Shop;
