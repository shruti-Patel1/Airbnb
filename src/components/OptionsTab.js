import { Tab, Tabs, tabsClasses, Container, Button } from "@mui/material";
import { locationsTab } from "data/mock-data";
import React from "react";
import { FaFilter } from "react-icons/fa";
const OptionsTab = () => {
  const [value, setValue] = React.useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexGrow: 1,
        px: { sx: 0, md: 2 },
        alignItems: "center",
        mt: 2,
        mb: 2,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
        }}
      >
        {locationsTab.map((tab) => {
          return <Tab key={tab.id} icon={tab.icon} label={tab.label} />;
        })}
      </Tabs>
      <Button
        sx={{
          display: { xs: "none", md: "block" },
          border: "1px solid #ddd",
          minWidth: 90,
          justifyContent: "space-between",
          borderRadius: 2,
          textTransform: "capitalize",
          py: 1,
          color: "theme.palette.text.primary",
        }}
      >
        <FaFilter /> Filters
      </Button>
    </Container>
  );
};

export default OptionsTab;
