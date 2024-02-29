import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
interface Props {
  sortOptions: any[];
  onChange: (event: any) => void;
  selectedValue: string;
}
const RadioButtons = ({ sortOptions, onChange, selectedValue }: Props) => {
  return (
    <div className="radioButtons">
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={onChange}
          value={selectedValue}
        >
          {sortOptions.map(({ value, label }) => (
            <FormControlLabel value={value} control={<Radio />} label={label} />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};
export default RadioButtons;
