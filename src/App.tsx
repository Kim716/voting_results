import { Box } from "@mui/material";
import { Header } from "@/components/Header";
import { TabBar } from "@/components/TabBar";
import { useState } from "react";
import { PresidentPanel } from "@/components/PresidentPanel";

export const App = () => {
  const [value, setValue] = useState(0);

  const tabs = [
    { value: 0, title: "第15任 總統副總統大選", component: <PresidentPanel /> },
    { value: 1, title: "第10任 立法委員選舉", component: <div>2</div> },
  ];

  return (
    <Box>
      <Header />
      <Box
        sx={(theme) => ({
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
