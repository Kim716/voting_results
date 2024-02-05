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
          py: "40px",
          [theme.breakpoints.down("sm")]: {
            py: "24px",
          },
        })}
      >
        <TabBar value={value} setValue={setValue} tabs={tabs} />
        <Box
          sx={(theme) => ({
            px: "40px",
            pt: "32px",
            pb: "40px",
            [theme.breakpoints.down("sm")]: {
              px: "24px",
              pb: "32px",
            },
          })}
        >
          {tabs.filter((tab) => tab.value === value)[0]?.component}
        </Box>
      </Box>
    </Box>
  );
};
