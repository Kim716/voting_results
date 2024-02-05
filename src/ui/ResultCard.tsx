import { Box, Typography } from "@mui/material";
import districtVoteResultRawData from "@/assets/data/districtVoteResult.json";
import { CandidateGroup } from "./CandidateGroup";
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

interface ResultCardProps {
  cityValue: string;
  districtValue?: string;
  villageValue?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  cityValue,
  districtValue,
  villageValue,
}) => {
  const districtData: DistrictVoteResultData = districtVoteResultRawData;
  const renderName = villageValue || districtValue || cityValue;
  const filteredData =
    districtValue && villageValue
      ? districtData[cityValue].district[districtValue].village[villageValue]
      : districtValue
      ? districtData[cityValue].district[districtValue]
      : districtData[cityValue];

  const renderData = Object.entries(filteredData)
    .map(([candidateNumber, voteCount]) => ({ candidateNumber, voteCount }))
    .filter((data) => typeof data.voteCount === "number")
    .sort((a, b) => b.voteCount - a.voteCount);

  const backgroundColor =
    policyPartyColorMap[
      candidateNumberPolicyPartyMap2020[renderData[0].candidateNumber]
    ];

  const totalVoteCount = renderData.reduce(
    (acc, data) => acc + data.voteCount,
    0
  );

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px",
        border: "2px solid black",
        borderColor: theme.palette[backgroundColor].main,
        borderRadius: "8px",
        background: theme.palette[backgroundColor].light,
        width: "300px",
        height: "210px",
      })}
    >
      <Typography variant="h6" fontWeight={600}>
        {renderName}
      </Typography>
      {renderData.map((data) => (
        <CandidateGroup
          key={data.candidateNumber}
          candidateNumber={data.candidateNumber}
          voteCount={data.voteCount}
          votePercentage={((data.voteCount / totalVoteCount) * 100).toFixed(2)}
        />
      ))}
    </Box>
  );
};
