import { Dropdown } from "@/ui/Dropdown";
import { Stack } from "@mui/material";
import districtRawData from "@/assets/data/district.json";
import { useState } from "react";

interface DistrictData {
  [city: string]: {
    [district: string]: string[];
  };
}

export const Filter: React.FC = () => {
  const districtData: DistrictData = { ...districtRawData };

  const [cityValue, setCityValue] = useState("");
  const [districtValue, setDistrictValue] = useState("");
  const [villageValue, setVillageValue] = useState("");

  return (
    <Stack direction="row" gap={2.5}>
      <Dropdown
        labelId="select-city"
        label="縣市"
        selectItems={Object.keys(districtData)}
        nameValue={cityValue}
        setNameValue={setCityValue}
      />
      <Dropdown
        labelId="select-district"
        label="鄉鎮市區"
        selectItems={Object.keys(districtData[cityValue] || {})}
        nameValue={districtValue}
        setNameValue={setDistrictValue}
      />
      <Dropdown
        labelId="select-village"
        label="村里"
        selectItems={
          (districtData[cityValue] && districtData[cityValue][districtValue]) ||
          []
        }
        nameValue={villageValue}
        setNameValue={setVillageValue}
      />
    </Stack>
  );
};
