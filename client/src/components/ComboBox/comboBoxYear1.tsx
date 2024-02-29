import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import {
  fetchCars,
  setCars,
  setFilters,
} from "../../features/CarsAction/carsSlice";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useAppDispatch, useAppSelector } from "../../redux/store";

interface Props {
  years: number[];
  onChange1: (event: any) => void;
  onChange2: (event: any) => void;
}
const ComboBoxYear1 = ({ years, onChange1, onChange2 }: Props) => {
  const [year1, setYear1] = useState<number>();
  const [year2, setYear2] = useState<number>();
  const dispatch = useAppDispatch();
  const selector = useAppSelector((store) => store.cars);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Od</InputLabel>
        <Select
          className="combo2"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Od"
          onChange={onChange1}
        >
          {years.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Do</InputLabel>
        <Select
          className="combo2"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Do"
          onChange={onChange2}
        >
          {years.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="dugme">
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => {
            dispatch(fetchCars());
          }}
        >
          Filtriraj <FilterAltIcon />
        </Button>
      </div>
    </div>
  );
};
export default ComboBoxYear1;
