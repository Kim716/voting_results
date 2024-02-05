import TaiwanSvg from "@/assets/taiwan.svg?react";
import TipClickFilter from "@/assets/tip-click-filter.png";
import TipClickMap from "@/assets/tip-click-map.png";
import { Box, Stack, useTheme } from "@mui/material";
import { Filter } from "@/components/Filter";
import { useEffect, useState } from "react";
import { Overview } from "@/ui/Overview";
import { Tip } from "@/ui/Tip";
import { ResultCard } from "@/ui/ResultCard";

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
  const [districtValue, setDistrictValue] = useState("");
  const [villageValue, setVillageValue] = useState("");
  const [citySvgId, setCitySvgId] = useState("");

  useEffect(() => {
    setCitySvgId(cityNameSvgIdMap[cityValue]);
  }, [cityValue]);

  return (
    <Box>
      <Filter
        {...{
          cityValue,
          setCityValue,
          districtValue,
          setDistrictValue,
          villageValue,
          setVillageValue,
        }}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        marginTop="40px"
      >
        <Overview />
        <Box
          sx={{
            path: { cursor: "pointer" },
            [` .${citySvgId},.${citySvgId} path`]: {
              fill: theme.palette.steelBlue.main,
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            const targetCityValue = Object.keys(cityNameSvgIdMap).find(
              (key) =>
                cityNameSvgIdMap[key] ===
                (e.target as HTMLElement)?.classList[0]
            );
            if (!targetCityValue) {
              return;
            }
            setCityValue(targetCityValue);
            setDistrictValue("");
            setVillageValue("");
          }}
        >
          <TaiwanSvg />
        </Box>
        <Stack gap="20px">
          {!cityValue && !districtValue && !villageValue ? (
            <>
              <Tip
                text="點擊選擇縣市、區、村里，可查看選舉結果"
                imageSrc={TipClickFilter}
              />
              <Tip text="點擊地圖查看縣市的選舉結果" imageSrc={TipClickMap} />
            </>
          ) : (
            <>
              {cityValue && <ResultCard {...{ cityValue }} />}
              {districtValue && (
                <ResultCard {...{ cityValue, districtValue }} />
              )}
              {villageValue && (
                <ResultCard {...{ cityValue, districtValue, villageValue }} />
              )}
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
