import { Dropdown } from "@/ui/Dropdown";
import { Button, Stack } from "@mui/material";
import districtVoteResultRawData from "@/assets/data/districtVoteResult.json";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DistrictVoteResultData } from "@/ui/ResultCard";

interface FilterProps {
  cityValue: string;
  setCityValue: React.Dispatch<React.SetStateAction<string>>;
  districtValue: string;
  setDistrictValue: React.Dispatch<React.SetStateAction<string>>;
  villageValue: string;
  setVillageValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Filter: React.FC<FilterProps> = ({
  cityValue,
  setCityValue,
  districtValue,
  setDistrictValue,
  villageValue,
  setVillageValue,
}) => {
  const districtData: DistrictVoteResultData = districtVoteResultRawData;

  const handleCityValueChange = (value: string) => {
    setCityValue(value);
    setDistrictValue("");
    setVillageValue("");
  };

  const handleDistrictValueChange = (value: string) => {
    setDistrictValue(value);
    setVillageValue("");
  };

  const handleVillageValueChange = (value: string) => {
    setVillageValue(value);
  };

  return (
    <Stack direction="row" gap={2.5} alignItems="center">
      <Dropdown
        labelId="select-city"
        label="縣市"
        selectItems={Object.keys(districtData)}
        nameValue={cityValue}
        onChange={handleCityValueChange}
      />
      <Dropdown
        labelId="select-district"
        label="鄉鎮市區"
        selectItems={Object.keys(districtData[cityValue]?.district || {})}
        nameValue={districtValue}
        onChange={handleDistrictValueChange}
      />
      <Dropdown
        labelId="select-village"
        label="村里"
        selectItems={Object.keys(
          districtData[cityValue]?.district[districtValue]?.village || {}
        )}
        nameValue={villageValue}
        onChange={handleVillageValueChange}
      />
      <Button
        variant="contained"
        color="steelBlue"
        sx={{ height: "30px", fontSize: "16px" }}
        endIcon={<RefreshIcon />}
        onClick={() => {
          if (!cityValue && !districtValue && !villageValue) {
            return;
          }
          setCityValue("");
          setDistrictValue("");
          setVillageValue("");
        }}
      >
        清除
      </Button>
    </Stack>
  );
};
