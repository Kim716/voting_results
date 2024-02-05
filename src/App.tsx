import { Box } from "@mui/material";
import { Header } from "@/components/Header";
import { TabBar } from "@/components/TabBar";
import { useState } from "react";
import { Panel } from "@/components/Panel";

export const App = () => {
  const [value, setValue] = useState(0);

  const tabs = [
    { value: 0, title: "第15任 總統副總統大選", component: <Panel /> },
  ];

  return (
    <Box>
      <Header />
      <Box
        sx={(theme) => ({
          overflow: "auto",
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
            pt: 4,
            pb: 5,
            [theme.breakpoints.down("sm")]: {
              pb: 4,
            },
          })}
        >
          {tabs.filter((tab) => tab.value === value)[0]?.component}
        </Box>
      </Box>
    </Box>
  );
};
