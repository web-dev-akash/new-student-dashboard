/* eslint-disable react/no-unescaped-entities */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
} from "@chakra-ui/react";

export const SpecialQuizEvent = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} textAlign={"left"}>
      <Alert
        padding={"15px 20px"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        variant="subtle"
        status={"info"}
        borderRadius={"10px"}
        position={"relative"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={"5px"}
        >
          <AlertIcon margin={0} />
          <AlertTitle>INDEPENDENCE DAY SPECIAL QUIZ FOR PARENTS</AlertTitle>
        </Box>
        <AlertDescription width={"100%"}>
          <Text
            fontSize={["13px", "13px", "15px", "15px"]}
            m={"5px 0"}
            width={"100%"}
            fontWeight={500}
          >
            On GK, Logical Reasoning and Science Time for parents to win lots of
            exciting prizes!!! <br />
            <Text as={"span"} fontWeight={600}>
              Date: 15th Aug 2024
            </Text>{" "}
            <Text as={"span"} ml={"15px"} fontWeight={600}>
              Time 11 AM to 12 PM
            </Text>
          </Text>
        </AlertDescription>
      </Alert>
    </Box>
  );
};
