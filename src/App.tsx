import { Box } from "@mui/material";
import { Header } from "@/components/Header";
import { TabBar } from "@/components/TabBar";
import { useState } from "react";

export const App = () => {
  const [value, setValue] = useState(0);

  const tabs = [
    { value: 0, title: "第15任 總統副總統大選", component: <div>1</div> },
    { value: 1, title: "第10任 立法委員選舉", component: <div>2</div> },
  ];

  return (
    <Box>
      <Header />
      <Box
        sx={(theme) => ({
          background: theme.palette.black.contrastText,
          py: 5,
          [theme.breakpoints.down("sm")]: {
            py: 3,
          },
        })}
      >
        <TabBar value={value} setValue={setValue} tabs={tabs} />
        <Box
          sx={(theme) => ({
            px: 5,
            pt: 2.5,
            pb: 5,
            [theme.breakpoints.down("sm")]: {
              pb: 2.5,
            },
          })}
        >
          {tabs.filter((tab) => tab.value === value)[0]?.component}
        </Box>
      </Box>
    </Box>
  );
};
