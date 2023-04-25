import React from "react";
import { Box, Container, minHeight } from "@mui/system";
import Logo from "./Logo";
import {
  flexBetweenCenter,
  dFlex,
  displayOnDesktop,
} from "themes/commonStyles";
import Link from "@mui/material/Link";

import LocationSearch from "./LocationSearch";
import ProfileSettings from "./ProfileSettings";
import MobileSearch from "./MobileSearch";
const Header = () => {
  return (
    <Box
      sx={{
        ...dFlex,
        minHeight: 70,
        borderBottom: "1px solid #ddd",
        px: "25px",
      }}
    >
      <Container maxWidth="xxl">
        <Box
          sx={{
            ...flexBetweenCenter,
            minHeight: 90,
            px: 4,
          }}
        >
          <Box sx={displayOnDesktop}>
            <Link href="/">
              <Logo />
            </Link>
          </Box>
          <Box sx={displayOnDesktop}>
            <LocationSearch />
          </Box>
          <Box sx={displayOnDesktop}>
            <ProfileSettings />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <MobileSearch />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
