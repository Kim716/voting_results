import { Box, Stack, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface TipProps {
  text: string;
  imageSrc: string;
}

export const Tip: React.FC<TipProps> = ({ text, imageSrc }) => {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px",
        borderRadius: "8px",
        background: theme.palette.grey[300],
        width: "300px",
        height: "210px",
      })}
    >
      <Box>
        <Stack direction="row" gap="8px" marginBottom="8px">
          <InfoOutlinedIcon />
          <Typography variant="h6" fontWeight={600}>
            小提示
          </Typography>
        </Stack>
        <Typography variant="trg">{text}</Typography>
      </Box>
      <Box
        component="img"
        src={imageSrc}
        alt="tip-image"
        width="220px"
        alignSelf="center"
      />
    </Box>
  );
};
