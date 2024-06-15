import { Box, Link, Text } from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
export const Footer = () => {
  return (
    <>
      <Box
        background="white"
        border={"1px solid #4E46E4"}
        borderRadius={"10px"}
        p={"1rem"}
      >
        <Text fontWeight={700} fontSize={["15px", "15px", "18px", "18px"]}>
          Contact Us
        </Text>
        <Box display={"flex"} alignItems={"center"} gap={"10px"} mt={2}>
          <FaEnvelope color="#4E46E4" />
          <Link
            href="mailto:rieti@wisechamps.com"
            fontSize={["12px", "12px", "14px", "15px"]}
          >
            rieti@wisechamps.com
          </Link>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={"10px"} mt={2}>
          <BsTelephoneFill color="#4E46E4" />
          <Link
            href="tel:8527074411"
            fontSize={["12px", "12px", "14px", "15px"]}
          >
            +91 8527074411
          </Link>
        </Box>
      </Box>
    </>
  );
};
