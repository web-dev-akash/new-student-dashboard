import { Box, Image } from "@chakra-ui/react";
import click from "/src/assets/click.gif";
// eslint-disable-next-line react/prop-types
export const ClickBtn = ({ style }) => {
  return (
    <Box {...style} position={"absolute"} right={0}>
      <Image src={click} alt="👆" width={["22px", "23px", "25px", "25px"]} />
    </Box>
  );
};
