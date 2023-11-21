import { Box, Typography } from "@mui/material";

export const Header: React.FC = () => {
  return (
    <Box
      sx={(theme) => ({
        width: "100vw",
        px: 6,
        py: 2,
        background: theme.palette.steelBlue.main,
        [theme.breakpoints.down("sm")]: {
          px: 3,
        },
      })}
    >
      <Typography variant="h4" sx={{ color: "#FFFFFF" }}>
        2020 開票地圖
      </Typography>
    </Box>
  );
};
