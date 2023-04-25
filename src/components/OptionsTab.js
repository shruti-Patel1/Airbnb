import { Tab, Tabs, tabsClasses, Container, Button, Box } from "@mui/material";
import { red } from "@mui/material/colors";
import { locationsTab } from "data/mock-data";
import React from "react";
import { FaFilter } from "react-icons/fa";
const OptionsTab = (props) => {
  const [value, setValue] = React.useState(0);
  props.setValue(value);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ ml: "50px", mr: "85px" }}>
      <Container
        maxWidth="xxl"
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
          textColor="inherit"
          indicatorColor="primary"
          color="red"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              borderRadius: 10,
              height: "26px",
              width: "26px",
              "&.Mui-disabled": { opacity: 0.3 },
              border: "1px solid black",
            },
            alignItems: "center",
          }}
        >
          {locationsTab.map((tab) => {
            return (
              <Tab
                sx={{ fontWeight: "900", fontSize: "0.7rem" }}
                key={tab.id}
                icon={tab.icon}
                label={tab.label}
              />
            );
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
            ml: 3,
            color: "theme.palette.text.primary",
          }}
        >
          <FaFilter /> Filters
        </Button>
      </Container>
    </Box>
  );
};

export default OptionsTab;
