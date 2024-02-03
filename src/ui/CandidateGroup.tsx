import { Box, Stack, Typography } from "@mui/material";
import candidateRawData from "@/assets/data/candidate.json";
import {
  candidateNumberPolicyPartyMap2020,
  policyPartyColorMap,
} from "@/utils/const";

interface CandidateData {
  candidateNumber: string;
  president: string;
  vicePresident: string;
  note: string;
}

interface CandidateGroupProps {
  candidateNumber: number;
  voteCount: number;
  votePercentage: string;
}

export const CandidateGroup: React.FC<CandidateGroupProps> = ({
  candidateNumber,
  voteCount,
  votePercentage,
}) => {
  const candidateData: CandidateData[] = [...candidateRawData];
  const renderCandidate = candidateData
    .filter(
      (candidate) => candidate.candidateNumber === String(candidateNumber)
    )
    ?.at(0);
  const policyParty = candidateNumberPolicyPartyMap2020[candidateNumber];

  if (!renderCandidate) {
    return;
  }

  return (
    <Stack flexDirection="row" gap="20px" alignItems="center">
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={(theme) => ({
          width: "30px",
          height: "30px",
          background: theme.palette[policyPartyColorMap[policyParty]].main,
          borderRadius: "50%",
        })}
      >
        <Typography variant="trg" color="#FFFFFF">
          {candidateNumber}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        width="104px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography variant="trg" fontWeight={600}>
            {policyParty}
          </Typography>
          <Typography variant="txs">
            {renderCandidate.president} | {renderCandidate.vicePresident}
          </Typography>
        </Box>
        <Box
          sx={(theme) => ({
            width: "2px",
            height: "30px",
            background: theme.palette[policyPartyColorMap[policyParty]].main,
          })}
        />
      </Stack>
      <Stack alignItems="start">
        <Typography variant="trg" fontWeight={600}>
          {votePercentage} %
        </Typography>
        <Typography variant="txs">
          {voteCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 票
        </Typography>
      </Stack>
    </Stack>
  );
};
