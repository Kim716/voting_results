import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Cell, Pie, PieChart } from "recharts";
import voteOverviewRawData from "@/assets/data/voteOverview.json";
import candidateOverviewRawData from "@/assets/data/candidateOverview.json";
import { CandidateGroup } from "./CandidateGroup";
import {
  candidateNumberPolicyPartyMap2020,
  policyPartyColorMap,
} from "@/utils/const";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface voteOverviewData {
  [key: string]: number;
}

interface candidateOverviewData {
  candidateNumber: number;
  voteCount: number;
}

export const Overview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const voteOverviewData: voteOverviewData = voteOverviewRawData;
  const voteTotal = voteOverviewData["有效票"] + voteOverviewData["無效票"];
  const votePercentage = (
    (voteTotal / voteOverviewData["選舉人數"]) *
    100
  ).toFixed(1);
  const voteOverviewPieData = [
    { name: "投票數", value: voteTotal, color: theme.palette.steelBlue.main },
    {
      name: "未投票數",
      value: voteOverviewData["選舉人數"] - voteTotal,
      color: theme.palette.grey[300],
    },
  ];
  const voteOverviewTextData = [
    { title: "投票數", count: voteTotal },
    { title: "無效票數", count: voteOverviewData["無效票"] },
    { title: "有效票數", count: voteOverviewData["有效票"] },
  ];

  const candidateOverviewData: candidateOverviewData[] =
    candidateOverviewRawData.sort(
      (a, b) => b.candidateNumber - a.candidateNumber
    );
  const candidateOverviewPieData = candidateOverviewData.map((data) => {
    const policyParty = candidateNumberPolicyPartyMap2020[data.candidateNumber];
    return {
      name: data.candidateNumber,
      value: data.voteCount,
      color: theme.palette[policyPartyColorMap[policyParty]].main,
    };
  });

  return (
    <Accordion
      defaultExpanded={!isMobile}
      sx={{
        background: theme.palette.white.main,
        p: "20px",
        borderRadius: "8px",
        [theme.breakpoints.down("sm")]: {
          width: "100%",
          p: 0,
          borderRadius: "8px",
        },
      }}
    >
      <AccordionSummary expandIcon={isMobile && <ExpandMoreIcon />}>
        <Typography variant="h6" fontWeight={600}>
          投票概況
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          direction="column"
          marginTop="20px"
          sx={{
            [theme.breakpoints.down("sm")]: {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 0,
            },
          }}
        >
          <Stack direction="row" alignItems="center" gap="20px">
            <PieChart width={120} height={120}>
              <Pie
                data={voteOverviewPieData}
                innerRadius={35}
                outerRadius={60}
                dataKey="value"
              >
                {voteOverviewPieData.map((data, index) => (
                  <Cell key={`cell-${index}`} fill={data.color} />
                ))}
              </Pie>
            </PieChart>
            <Stack direction="column" alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                {votePercentage}%
              </Typography>
              <Typography variant="trg">投票率</Typography>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            gap="8px"
            marginTop="20px"
            marginBottom="40px"
            sx={{
              [theme.breakpoints.down("sm")]: {
                margin: 0,
              },
            }}
          >
            {voteOverviewTextData.map((data) => (
              <Stack
                key={data.title}
                direction="row"
                alignItems="center"
                gap="8px"
              >
                <Typography variant="trg">{data.title} </Typography>
                <Typography variant="txs" fontWeight={600}>
                  {data.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  票
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack
          sx={{
            [theme.breakpoints.down("sm")]: {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "30px",
            },
          }}
        >
          <PieChart width={120} height={120}>
            <Pie
              data={candidateOverviewPieData}
              innerRadius={35}
              outerRadius={60}
              dataKey="value"
            >
              {candidateOverviewPieData.map((data, index) => (
                <Cell key={`cell-${index}`} fill={data.color} />
              ))}
            </Pie>
          </PieChart>
          <Stack
            gap="8px"
            marginTop="20px"
            sx={{
              [theme.breakpoints.down("sm")]: {
                margin: 0,
              },
            }}
          >
            {candidateOverviewData.map((data) => (
              <CandidateGroup
                key={data.candidateNumber}
                candidateNumber={data.candidateNumber}
                voteCount={data.voteCount}
                votePercentage={(
                  (data.voteCount / voteOverviewData["有效票"]) *
                  100
                ).toFixed(2)}
              />
            ))}
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
