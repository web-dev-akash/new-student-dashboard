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
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const TestSeriesDoubtSession = () => {
  const maths = useSelector((state) => state.user.testSeries.Maths);
  const science = useSelector((state) => state.user.testSeries.Science);
  const english = useSelector((state) => state.user.testSeries.English);
  const doubtSessions = useSelector((state) => state.doubtSession.data);
  const doubtSessionStatus = useSelector((state) => state.doubtSession.status);

  const [subject, setSubject] = useState(null);
  const [time, setTime] = useState(null);
  const [joiningLink, setJoiningLink] = useState(null);

  const allSubjects = {
    Maths: maths,
    Science: science,
    English: english,
  };

  function formatDateTime(Session_Date_Time) {
    const dateObj = new Date(Session_Date_Time);
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    if (hours > 12) {
      hours -= 12;
    }

    if (hours === 0) {
      hours = 12;
    }

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${formattedMinutes} ${period}`;
  }

  useEffect(() => {
    const filteredDoubtSessions = doubtSessions.filter(
      (session) => allSubjects[session.Subject]
    );

    const sortedDoubtSessions = filteredDoubtSessions.sort(
      (a, b) => new Date(a.Session_Date_Time) - new Date(b.Session_Date_Time)
    );

    const currentSession = sortedDoubtSessions.filter(
      (item) =>
        moment(item.Session_Date_Time).format("YYYY-MM-DD") ===
        moment().format("YYYY-MM-DD")
    );

    const dateTimeStr =
      currentSession?.[0]?.Session_Date_Time ??
      `${moment().format("YYYY-MM-DD")}T17:00:00+05:30`;

    setTime(formatDateTime(dateTimeStr));
    setSubject(currentSession?.[0].Subject);
    setJoiningLink(currentSession?.[0].Zoom_Link);
  }, [doubtSessionStatus]);

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
            Click the JOIN NOW button to join today's doubt session.
          </Text>
          <Button
            fontSize={"13px"}
            margin={"10px 0 5px 0"}
            width={["100%", "100%", "max-content", "max-content"]}
            bg={"white"}
            border={"none"}
            onClick={() => window.open(joiningLink, "_blank")}
          >
            Join Now
          </Button>
        </AlertDescription>
      </Alert>
    </Box>
  );
};
