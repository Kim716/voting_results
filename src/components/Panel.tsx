import TaiwanSvg from "@/assets/taiwan.svg?react";
import TipClickFilter from "@/assets/tip-click-filter.png";
import TipClickMap from "@/assets/tip-click-map.png";
import { Box, Stack, useTheme } from "@mui/material";
import { Filter } from "@/components/Filter";
import { useEffect, useState } from "react";
import { Overview } from "@/ui/Overview";
import { Tip } from "@/ui/Tip";
import { ResultCard } from "@/ui/ResultCard";
import districtVoteResultRawData from "@/assets/data/districtVoteResult.json";
import {
  candidateNumberPolicyPartyMap2020,
  policyPartyColorMap,
} from "@/utils/const";

export interface DistrictVoteResultData {
  [city: string]: {
    "1": number;
    "2": number;
    "3": number;
    district: {
      [district: string]: {
        "1": number;
        "2": number;
        "3": number;
        village: {
          [village: string]: {
            "1": number;
            "2": number;
            "3": number;
          };
        };
      };
    };
  };
}

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
  const districtData: DistrictVoteResultData = districtVoteResultRawData;
  const [cityValue, setCityValue] = useState("");
  const [districtValue, setDistrictValue] = useState("");
  const [villageValue, setVillageValue] = useState("");
  const [citySvgId, setCitySvgId] = useState("");

  useEffect(() => {
    setCitySvgId(cityNameSvgIdMap[cityValue]);
  }, [cityValue]);

  const taiwanSvgColor = Object.entries(districtData)
    .map(([cityName, voteResult]) => {
      const higherVoteCountCandidateNumber = Object.entries(voteResult)
        .filter(([_, value]) => typeof value === "number")
        .sort((a, b) => {
          if (typeof a[1] === "number" && typeof b[1] === "number") {
            return b[1] - a[1];
          }
          return 0;
        })[0][0];
      const color =
        policyPartyColorMap[
          candidateNumberPolicyPartyMap2020[higherVoteCountCandidateNumber]
        ];
      return [cityNameSvgIdMap[cityName], color];
    })
    .reduce(
      (acc, [cityId, color]) => ({
        ...acc,
        [` .${cityId}`]: {
          fill: theme.palette[color as "blue" | "green" | "brown"][
            cityId === citySvgId ? "dark" : "main"
          ],
        },
      }),
      {}
    );

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
        sx={{
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          },
        }}
      >
        <Overview />
        <Box
          sx={{
            path: { cursor: "pointer" },
            ...taiwanSvgColor,
            svg: {
              [theme.breakpoints.down("lg")]: {
                width: "400px",
                height: "590px",
              },
              [theme.breakpoints.down("sm")]: {
                width: "100%",
                height: "450px",
                marginTop: "10px",
              },
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
        <Stack
          gap="20px"
          width="300px"
          sx={{
            [theme.breakpoints.down("sm")]: {
              flexDirection: "row",
              width: "100%",
              overflow: "auto",
              marginTop: "20px",
            },
          }}
        >
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
