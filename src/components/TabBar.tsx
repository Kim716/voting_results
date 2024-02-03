import { Tab } from "@/ui/Tab";
import { Tabs } from "@mui/material";

interface TabBarProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  tabs: { value: number; title: string; component: JSX.Element }[];
}

export const TabBar: React.FC<TabBarProps> = ({ value, setValue, tabs }) => {
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      TabIndicatorProps={{
        style: { display: "none" },
      }}
      sx={{
        "& .MuiTabs-flexContainer": {
          gap: 2.5,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tab label={tab.title} key={tab.value} />
      ))}
    </Tabs>
  );
};
