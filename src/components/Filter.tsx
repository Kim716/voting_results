import { Dropdown } from "@/ui/Dropdown";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
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
  const theme = useTheme();
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
    <Box
      sx={(theme) => ({
        display: "grid",
        gridTemplateColumns: "repeat(3, 156px) 100px",
        gap: "20px",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
          gridTemplateColumns: "repeat(2, 1fr) 30px",
        },
      })}
    >
      <Dropdown
        labelId="select-city"
        label="縣市"
        selectItems={Object.keys(districtData)}
        nameValue={cityValue}
        onChange={handleCityValueChange}
        styles={{
          [theme.breakpoints.down("sm")]: {
            gridColumn: "1/-2",
            gridRow: "1/2",
          },
        }}
      />
      <Dropdown
        labelId="select-district"
        label="鄉鎮市區"
        selectItems={Object.keys(districtData[cityValue]?.district || {})}
        nameValue={districtValue}
        onChange={handleDistrictValueChange}
        styles={{
          [theme.breakpoints.down("sm")]: {
            gridColumn: "1/2",
            gridRow: "2/3",
          },
        }}
      />
      <Dropdown
        labelId="select-village"
        label="村里"
        selectItems={Object.keys(
          districtData[cityValue]?.district[districtValue]?.village || {}
        )}
        nameValue={villageValue}
        onChange={handleVillageValueChange}
        styles={{
          [theme.breakpoints.down("sm")]: {
            gridColumn: "2/3",
            gridRow: "2/3",
          },
        }}
      />
      <Button
        variant="contained"
        color="steelBlue"
        sx={{
          height: "30px",
          fontSize: "16px",
          [theme.breakpoints.down("sm")]: {
            gridRow: "1/3",
            height: "100%",
            minWidth: "20px",
            span: {
              margin: 0,
            },
          },
        }}
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
        {useMediaQuery(theme.breakpoints.down("sm")) ? null : "清除"}
      </Button>
    </Box>
  );
};
