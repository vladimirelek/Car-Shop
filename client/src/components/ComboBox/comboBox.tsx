import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
interface Props {
  onChange: (even: any) => void;
  proizvodjaci: string[];
  value: string;
}
const ComboBoxProizvodjac = ({ onChange, proizvodjaci, value }: Props) => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((store) => store.cars);

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Proizvodjac</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="make"
        value={value}
        onChange={onChange}
      >
        {proizvodjaci.map((item) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default ComboBoxProizvodjac;
