import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";

import { CssBaseline } from "@mui/material";
import Header from "components/Header";
import OptionsTab from "components/OptionsTab";
import LocationCards from "components/LocationCards";
import Footer from "components/Footer";
import FooterMenu from "components/FooterMenu";
import { displayOnDesktop } from "themes/commonStyles";
import MobileFooter from "components/MobileFooter";
import { locationsTab } from "data/mock-data";

function App() {
  const [value, setValue] = useState(0);
  const [data, setData] = useState();

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box>
          <Header />
          <OptionsTab setValue={setValue} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            height: 100,
            overflowY: "scroll",
            px: { md: "40px" },
          }}
        >
          {locationsTab.map((data1) => {
            return (
              <>
                <TabPanel value={value} index={data1.id - 1}>
                  <Container maxWidth="xxl" sx={{ mb: 3 }}>
                    <LocationCards value={data1.label} />
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                      <MobileFooter />
                    </Box>
                  </Container>
                </TabPanel>
              </>
            );
          })}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <FooterMenu />
        </Box>
        <Box sx={displayOnDesktop}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default App;
