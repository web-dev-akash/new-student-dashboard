/* eslint-disable react/no-unescaped-entities */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const doubtSessionLink = {
  Maths: import.meta.env.VITE_APP_MATH_DOUBT_ZOOM_LINK,
  English: import.meta.env.VITE_APP_ENGLISH_DOUBT_ZOOM_LINK,
  Science: import.meta.env.VITE_APP_SCIENCE_DOUBT_ZOOM_LINK,
};

export const TestSeriesDoubtSession = () => {
  const maths = useSelector((state) => state.user.testSeries.Maths);
  const science = useSelector((state) => state.user.testSeries.Science);
  const english = useSelector((state) => state.user.testSeries.English);
  const [subject, setSubject] = useState(null);
  const [time, setTime] = useState(null);
  const doubtSession = useSelector((state) => state.testSeries.doubtSession);

  const doubtSessionDay = (subject) => {
    const { data } = doubtSession;
    for (let i = 0; i < data.length; i++) {
      if (data[i].Subject === subject) {
        setSubject(data[i].Subject);
        setTime(data[i].Time);
      }
    }
  };

  useEffect(() => {
    if (maths) {
      doubtSessionDay("Maths");
    } else if (english) {
      doubtSessionDay("English");
    } else if (science) {
      doubtSessionDay("Science");
    }
  }, []);

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
          <AlertTitle>
            Join {subject} Doubt Session {time ? `(${time})` : "(5 PM)"}
          </AlertTitle>
        </Box>
        <AlertDescription width={"100%"}>
          <Text
            fontSize={["13px", "13px", "15px", "15px"]}
            m={"5px 0"}
            width={"100%"}
            fontWeight={500}
          >
            Click the JOIN QUIZ NOW button to join today's quiz.
          </Text>
          <Button
            fontSize={"13px"}
            margin={"10px 0 5px 0"}
            width={["100%", "100%", "max-content", "max-content"]}
            bg={"white"}
            border={"none"}
            onClick={() => window.open(doubtSessionLink[subject], "_blank")}
          >
            Join Quiz Now
          </Button>
        </AlertDescription>
      </Alert>
    </Box>
  );
};
