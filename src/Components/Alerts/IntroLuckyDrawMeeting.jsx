import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";

export const IntroLuckyDrawMeeting = () => {
  const freeMeetLink = import.meta.env.VITE_APP_FREE_MEETING_LINK;
  const id = useSelector((state) => state.user.id);
  const authToken = import.meta.env.VITE_APP_AUTH_TOKEN;
  const [tempLoading, setTempLoading] = useState(false);

  const handleClick = async (contactId, freeMeetLink) => {
    try {
      setTempLoading(true);
      const url = `https://backend.wisechamps.com/student/introMeet`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };
      await axios.post(url, { contactId: contactId }, config);
      window.open(freeMeetLink, "_blank");
      setTempLoading(false);
    } catch (error) {
      setTempLoading(false);
      console.log("Error :", error);
    }
  };

  return (
    <Box display={"flex"} justifyContent={"center"} textAlign={"left"}>
      <Alert
        padding={"15px 20px"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        variant="subtle"
        status={"success"}
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
          <AlertTitle>New to Wisechamps ?</AlertTitle>
        </Box>
        <AlertDescription width={"100%"}>
          <Text
            fontSize={["13px", "13px", "15px", "15px"]}
            m={"5px 0"}
            width={"100%"}
            fontWeight={500}
          >
            Join our Intro Lucky Draw Meeting and get a change to win Wisechamps
            Coins
          </Text>
          <Button
            fontSize={"13px"}
            margin={"10px 0 5px 0"}
            width={["100%", "100%", "160px", "160px"]}
            bg={"white"}
            border={"none"}
            isLoading={tempLoading}
            loadingText={""}
            onClick={() => handleClick(id, freeMeetLink)}
          >
            Join Meeting Now
          </Button>
        </AlertDescription>
      </Alert>
    </Box>
  );
};
