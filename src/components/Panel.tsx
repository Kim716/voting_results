import TaiwanSvg from "@/assets/taiwan.svg?react";
import { Box, useTheme } from "@mui/material";
import { Filter } from "@/components/Filter";
import { useEffect, useState } from "react";

const cityNameSvgIdMap: {
  [key: string]: string;
} = {
  龜山島: "GuishanIsland",
  綠島: "GreenIsland",
  蘭嶼: "Lanyu",
  宜蘭縣: "Yilan",
  花蓮縣: "Hualien",
  臺東縣: "Taitung",
  新北市: "NewTaipei",
  臺北市: "Taipei",
  桃園市: "Taoyuan",
  新竹縣: "HsinchuCounty",
  新竹市: "HsinchuCity",
  連江縣: "Lienchiang",
  金門縣: "Kinmen",
  澎湖縣: "Penghu",
  小琉球: "Liuqiu",
  苗栗縣: "Miaoli",
  南投縣: "Nantou",
  臺中市: "Taichung",
  屏東縣: "Pingtung",
  雲林縣: "Yunlin",
  嘉義縣: "ChiayiCounty",
  臺南市: "Tainan",
  高雄市: "Kaohsiung",
  嘉義市: "ChiayiCity",
  彰化縣: "Changhua",
  基隆市: "Keelung",
};

export const Panel: React.FC = () => {
  const theme = useTheme();
  const [cityValue, setCityValue] = useState("");
  const [citySvgId, setCitySvgId] = useState("");

  useEffect(() => {
    setCitySvgId(cityNameSvgIdMap[cityValue]);
  }, [cityValue]);

  useEffect(() => {
    const targetCityValue = Object.keys(cityNameSvgIdMap).find(
      (key) => cityNameSvgIdMap[key] === citySvgId
    );
    if (!targetCityValue) {
      return;
    }
    setCityValue(targetCityValue);
  }, [citySvgId]);

  return (
    <Box>
      <Filter cityValue={cityValue} setCityValue={setCityValue} />
      <Box
        sx={{
          mt: 5,
          path: { cursor: "pointer" },
          [` .${citySvgId},.${citySvgId} path`]: {
            fill: theme.palette.steelBlue.main,
          },
        }}
        onClick={(e) => {
          e.stopPropagation();
          setCitySvgId((e.target as HTMLElement)?.classList[0]);
        }}
      >
        <TaiwanSvg />
      </Box>
    </Box>
  );
};
