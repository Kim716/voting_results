import {
  Tab as MuiTab,
  TabProps as MuiTabProps,
  Typography,
} from "@mui/material";

interface TabProps extends MuiTabProps {}

export const Tab: React.FC<TabProps> = ({ label, ...props }) => {
  return (
    <MuiTab
      {...props}
      label={
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
      }
      sx={(theme) => ({
        color: theme.palette.white.dark,
        borderBottom: "4px solid",
        borderColor: "transparent",
        p: 0,
        "&:hover": {
          color: theme.palette.steelBlue.main,
          borderBottomColor: theme.palette.white.dark,
        },
        "&.Mui-selected": {
          color: theme.palette.black.main,
          borderBottomColor: theme.palette.steelBlue.main,
        },
      })}
    />
  );
};
