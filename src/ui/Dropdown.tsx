import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface DropdownProps {
  labelId: string;
  label: string;
  selectItems: string[];
  nameValue: string;
  onChange: (value: string) => void;
  styles: object;
}

export const Dropdown: React.FC<DropdownProps> = ({
  labelId,
  label,
  selectItems,
  nameValue,
  onChange,
  styles,
}) => {
  return (
    <FormControl size="small" color="steelBlue" sx={styles}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        value={selectItems.find((item) => item === nameValue) ? nameValue : ""}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        IconComponent={KeyboardArrowDownIcon}
        sx={{ width: "100%", borderRadius: 2 }}
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
