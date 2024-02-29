import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
interface Props {
  onChange: (even: any) => void;
  value: string;
  gorivo: string[];
}
const ComboBoxGorivo = ({ onChange, value, gorivo }: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Gorivo</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Gorivo"
        value={value}
        onChange={onChange}
      >
        {gorivo.map((item) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default ComboBoxGorivo;
