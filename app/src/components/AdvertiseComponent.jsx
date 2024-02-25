import React from 'react'
import { Typography, useTheme } from "@mui/material";

import advertImage from '../assets/images/advertImage.jpg';
// COMPONENTS IMPORTS
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";

function AdvertiseComponent() {

  // STATES AND VARIABLE
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={advertImage}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>FabHair</Typography>
        <Typography color={medium}>fabhair.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your hair
        is exfoliating hair and shining like light.
      </Typography>
    </WidgetWrapper>
  )
}

export default AdvertiseComponent;