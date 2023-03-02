import React from "react";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import { Button, Stack, Box, Typography, Paper } from "@mui/material";

// react icons
import { BsGlobe } from "react-icons/bs";
import { IoChevronUpOutline } from "react-icons/io5";

import {
  flexBetweenCenter,
  justifyCenter,
  fullWidthFlex,
} from "themes/commonStyles";

const footerLinks = [
  { id: 1, text: "Privacy", url: "#" },
  { id: 2, text: "Terms", url: "#" },
  { id: 3, text: "Sitemap", url: "#" },
  { id: 4, text: "Destinations", url: "#" },
];
const Footer = () => {
  return (
    <Box
      sx={{
        ...fullWidthFlex,
        borderTop: "1px solid #ddd",
        mr: "35px",
        ml: "30px",
      }}
    >
      <Container maxWidth="xxl">
        <Box
          sx={{
            ...flexBetweenCenter,
            width: "100%",
          }}
        >
          <Stack>
            <Paper>
              <Link href="#">2022 Airnbnb Copyright</Link>
            </Paper>
            {footerLinks.map((link) => {
              return (
                <Paper key={link.id}>
                  <Link href={link.url}>{link.text}</Link>
                </Paper>
              );
            })}
          </Stack>
          <Stack>
            <Paper>
              <Button>
                <Box sx={{ justifyCenter }}>
                  <Button>
                    <Box sx={{ ...justifyCenter, mr: 1 }}>
                      <BsGlobe size={24} />
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: (theme) => theme.palette.text.primary,
                      }}
                    >
                      English(CA)
                    </Typography>
                  </Button>
                  <Button
                    sx={{
                      fontWeight: "bold",
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    $CAD
                  </Button>
                  <Button
                    sx={{
                      fontWeight: "bold",
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    Support & Resources
                    <Box sx={{ ...justifyCenter, ml: 1 }}>
                      <IoChevronUpOutline size={24} />
                    </Box>
                  </Button>
                </Box>
              </Button>
            </Paper>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
