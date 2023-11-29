import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface DropdownProps {
  labelId: string;
  label: string;
  selectItems: string[];
  nameValue: string;
  setNameValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Dropdown: React.FC<DropdownProps> = ({
  labelId,
  label,
  selectItems,
  nameValue,
  setNameValue,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setNameValue(event.target.value);
  };

  return (
    <FormControl size="small" color="steelBlue">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        value={selectItems.find((item) => item === nameValue) ? nameValue : ""}
        label={label}
        onChange={handleChange}
        IconComponent={KeyboardArrowDownIcon}
        sx={{ width: "156px", borderRadius: 2 }}
      >
        {selectItems?.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
