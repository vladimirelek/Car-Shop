import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "../../../redux/store";
import { fetchCars, setFilters } from "../carsSlice";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="search-bar-container">
      <SearchIcon fontSize="large" className="lupa" />
      <input
        type="text"
        placeholder="Search"
        className="search-bar"
        onChange={(event: any) => {
          dispatch(setFilters({ searchTerm: event.target.value }));
          dispatch(fetchCars());
        }}
      />
      <button
        className="search-button"
        onClick={() => {
          navigate("/addNewCar");
        }}
      >
        POST A CAR <AddCircleOutlineIcon />
      </button>
    </div>
  );
};
export default Search;
