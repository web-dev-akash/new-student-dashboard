/* eslint-disable no-unused-vars */
import { Box, Button, Divider, Image, Tag, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuChevronLeftCircle, LuChevronRightCircle } from "react-icons/lu";
import previewImage from "/src/assets/preview.jpg";
import { Link } from "react-router-dom";
import doubtLogo from "/src/assets/doubt_logo.gif";

import mathsBG from "/src/assets/maths_doubt_session.png";
import scienceBG from "/src/assets/science_doubt_session.png";
import englishBG from "/src/assets/english_doubt_session.png";

import moment from "moment";
import { setAlert } from "../../Redux/action";

const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const bgImage = {
  Maths: mathsBG,
  Science: scienceBG,
  English: englishBG,
};

export const TestSeriesDoubtSessionComp = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alert);
  const maths = useSelector((state) => state.user.testSeries.Maths);
  const science = useSelector((state) => state.user.testSeries.Science);
  const english = useSelector((state) => state.user.testSeries.English);

  const allSubjects = {
    Maths: maths,
    Science: science,
    English: english,
  };

  const [status, setStatus] = useState("inactive");
  const [error, setError] = useState(false);

  const doubtSessions = useSelector((state) => state.doubtSession.data);
  const doubtSessionStatus = useSelector((state) => state.doubtSession.status);

  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [isAtStart, setIsAtStart] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const [finalSessions, setFinalSesisons] = useState([]);

  const getSessionStatus = (dateTimeStr) => {
    const inputTime = new Date(dateTimeStr);

    const currentTime = new Date();

    const activeStart = new Date(inputTime.getTime() - 5 * 60 * 1000);
    const activeEnd = new Date(inputTime.getTime() + 60 * 60 * 1000);

    if (currentTime >= activeStart && currentTime <= activeEnd) {
      return "active";
    }

    return "inactive";
  };

  const handlePrev = () => {
    setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setIndex((prevIndex) => {
      const container = containerRef.current;
      const currentItem = itemRefs.current[prevIndex]?.current;
      const itemWidth = currentItem ? currentItem.clientWidth : 0;
      const containerWidth = container ? container.clientWidth : 0;

      const maxScrollLeft = container
        ? container.scrollWidth - containerWidth
        : 0;

      const newScrollLeft = prevIndex * itemWidth;

      if (index >= doubtSessions.length - 1) {
        return doubtSessions.length - 1;
      }

      if (newScrollLeft > maxScrollLeft) {
        setIsAtEnd(true);
        return prevIndex;
      }

      return prevIndex + 1;
    });
  };

  const getColorScheme = (Session_Date_Time) => {
    const sessionDate = new Date(Session_Date_Time);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sessionDateOnly = new Date(
      sessionDate.getFullYear(),
      sessionDate.getMonth(),
      sessionDate.getDate()
    );
    const todayDateOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    if (sessionDateOnly < todayDateOnly) {
      return "linkedin";
    }

    if (sessionDateOnly > todayDateOnly) {
      return "purple";
    }

    return "whatsapp";
  };

  const formatDateTime = (Session_Date_Time) => {
    const dateObj = new Date(Session_Date_Time);
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
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
    const formattedDateTime = `${day} ${month}, ${hours}:${formattedMinutes} ${period}`;
    return formattedDateTime;
  };

  useEffect(() => {
    const filteredDoubtSessions = doubtSessions.filter(
      (session) => allSubjects[session.Subject]
    );

    const sortedDoubtSessions = filteredDoubtSessions.sort(
      (a, b) => new Date(a.Session_Date_Time) - new Date(b.Session_Date_Time)
    );

    setFinalSesisons(sortedDoubtSessions);

    let timeoutId;

    const updateButtonStatus = () => {
      const currentSession = sortedDoubtSessions.find(
        (item) =>
          moment(item.Session_Date_Time).format("YYYY-MM-DD") ===
          moment().format("YYYY-MM-DD")
      );

      if (currentSession) {
        const dateTimeStr = currentSession.Session_Date_Time;
        const sessionTime = moment(dateTimeStr);
        const now = moment();
        const timeUntilSessionStart = sessionTime.diff(now, "milliseconds");
        const timeUntilFiveMinutesBefore =
          timeUntilSessionStart - 5 * 60 * 1000;

        if (timeUntilFiveMinutesBefore > 0) {
          timeoutId = setTimeout(() => {
            const newStatus = getSessionStatus(dateTimeStr);
            setStatus(newStatus);
          }, timeUntilFiveMinutesBefore);
        } else {
          const newStatus = getSessionStatus(dateTimeStr);
          setStatus(newStatus);
        }
      }
    };

    updateButtonStatus();

    return () => clearTimeout(timeoutId);
  }, [doubtSessionStatus]);

  useEffect(() => {
    if (itemRefs.current.length === 0 || !containerRef.current) return;
    const container = containerRef.current;
    const currentItem = itemRefs.current[index]?.current;
    if (currentItem) {
      container.scrollTo({
        left: index * currentItem.clientWidth,
        behavior: "smooth",
      });

      setIsAtStart(index === 0);
      setIsAtEnd(index === itemRefs.current.length - 1);
    }
  }, [index]);

  useEffect(() => {
    if (status === "active") {
      if (!alerts.includes("testDoubt")) {
        dispatch(setAlert(["testDoubt", ...alerts]));
      }
    } else {
      if (alerts.includes("testDoubt")) {
        const newAlerts = alerts.filter((alert) => alert !== "testDoubt");
        dispatch(setAlert(newAlerts));
      }
    }
  }, [status]);

  return (
    <Box
      position={"relative"}
      overflow={"hidden"}
      mt={"15px"}
      background="#fff"
      borderRadius={"10px"}
      padding={"10px 0"}
      boxShadow={"rgba(0, 0, 0, 0.1) 0px 0px 20px 0px"}
      display={finalSessions.length === 0 ? "none" : "block"}
    >
      <Box
        fontWeight={700}
        fontSize={["15px", "15px", "18px", "18px"]}
        display={"flex"}
        alignItems={"center"}
        m={"0 0 0 10px"}
        gap={"5px"}
      >
        <Text>
          <Image
            mixBlendMode={"multiply"}
            src={doubtLogo}
            alt="📘"
            width={["55px", "55px", "60px", "65px", "70px"]}
          />
        </Text>
        <Text>Test Series Doubt Sessions</Text>
      </Box>
      <Divider border={"1.1px solid #5838fc"} marginBlock={"5px 2px"} />
      <Box
        padding={"20px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        gap={["12px", "12px", "15px", "15px"]}
        flexWrap={"nowrap"}
        overflowX={"auto"}
        scrollSnapType={"x mandatory"}
        width={"100%"}
        maxWidth={"100%"}
        ref={containerRef}
        id="quizScroller"
      >
        {finalSessions.map(
          (
            { Zoom_Link, id, Recording_Link, Subject, Name, Session_Date_Time },
            idx
          ) => {
            if (!itemRefs.current[idx]) {
              itemRefs.current[idx] = React.createRef();
            }
            return (
              <Box
                key={id}
                bg={"#fff"}
                padding={"15px 15px 15px"}
                borderRadius={"20px"}
                alignSelf={"stretch"}
                ref={itemRefs.current[idx]}
                scrollSnapAlign={"center"}
                minWidth={"260px"}
                position={"relative"}
                boxShadow={
                  getColorScheme(Session_Date_Time) === "whatsapp"
                    ? "0 0 0 2px #8B80F9, 8px 8px 0 0 #8B80F9"
                    : "rgba(0, 0, 0, 0.2) 0px 0px 20px 0px"
                }
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Tag
                    borderRadius={"50px"}
                    padding={"5px 10px"}
                    size={["sm", "sm", "md", "md"]}
                    colorScheme={getColorScheme(Session_Date_Time)}
                    fontSize={["10px", "10px", "13px", "13px"]}
                    fontWeight={500}
                  >
                    {Subject}
                  </Tag>
                  <Tag
                    borderRadius={"50px"}
                    padding={"5px 10px"}
                    size={["sm", "sm", "md", "md"]}
                    colorScheme={getColorScheme(Session_Date_Time)}
                    fontSize={["10px", "10px", "13px", "13px"]}
                    fontWeight={500}
                  >
                    {formatDateTime(Session_Date_Time)}
                  </Tag>
                </Box>
                <Box position={"relative"}>
                  <Image
                    src={bgImage[Subject]}
                    alt={Name}
                    width={"100%"}
                    maxWidth={"100%"}
                    maxHeight={"172.5px"}
                    borderRadius={"10px"}
                    objectFit={"cover"}
                    m={"10px 0"}
                    border={"1px solid #cccccc80"}
                    onError={() => setError(true)}
                    onLoad={() => setError(false)}
                    fallback={
                      <Box position={"relative"}>
                        <Image
                          src={previewImage}
                          alt={Name}
                          width={"100%"}
                          maxWidth={"100%"}
                          maxHeight={"172.5px"}
                          borderRadius={"10px"}
                          objectFit={"cover"}
                          m={"10px 0"}
                          border={"1px solid #cccccc80"}
                        />
                        <Text
                          position={"absolute"}
                          top={"80%"}
                          left={"50%"}
                          transform={"translate(-50%, -50%)"}
                          zIndex={9}
                          fontSize={"14px"}
                          fontWeight={700}
                          textAlign={"center"}
                          minWidth={"200px"}
                          textTransform={"uppercase"}
                        >
                          {Name}
                        </Text>
                      </Box>
                    }
                  />
                  {!error && (
                    <Text
                      position={"absolute"}
                      top={"50%"}
                      left={"50%"}
                      transform={"translate(-50%, -50%)"}
                      zIndex={9}
                      fontSize={"20px"}
                      fontWeight={Subject === "Science" ? 800 : 700}
                      letterSpacing={2}
                      lineHeight={1.3}
                      textAlign={"center"}
                      minWidth={"180px"}
                      textTransform={"uppercase"}
                      color={Subject === "Science" ? "#131C40" : "#fff"}
                    >
                      {Name}
                    </Text>
                  )}
                </Box>

                {!Recording_Link && (
                  <Button
                    id={
                      Zoom_Link &&
                      getSessionStatus(Session_Date_Time) === "active"
                        ? "submit-btn"
                        : "submit-btn-active"
                    }
                    fontSize={"12px"}
                    loadingText={""}
                    isDisabled={
                      !Zoom_Link ||
                      getSessionStatus(Session_Date_Time) === "inactive"
                    }
                    padding={"0 !important"}
                    onClick={() => window.open(Zoom_Link, "blank")}
                  >
                    Join Now
                  </Button>
                )}
                {Recording_Link && (
                  <Link
                    style={{
                      width: "100%",
                    }}
                    to={Recording_Link}
                    target="_blank"
                  >
                    <Button
                      id={"submit-btn"}
                      fontSize={"12px"}
                      padding={"0 !important"}
                      mt={"8px"}
                    >
                      Doubt Session Recording
                    </Button>
                  </Link>
                )}
              </Box>
            );
          }
        )}
      </Box>
      <Button
        onClick={handlePrev}
        m={"10px"}
        isDisabled={isAtStart}
        bg={"none"}
        fontSize={"28px"}
        position={"absolute"}
        top={"50%"}
        transform={"translateY(-50%)"}
        left={"-10px"}
        outline={"none"}
        padding={"0"}
        cursor={"pointer"}
        as={"p"}
        zIndex={999}
      >
        <LuChevronLeftCircle />
      </Button>
      <Button
        isDisabled={isAtEnd}
        onClick={handleNext}
        m={"10px"}
        bg={"none"}
        fontSize={"28px"}
        position={"absolute"}
        top={"50%"}
        transform={"translateY(-50%)"}
        right={"-10px"}
        outline={"none"}
        padding={"0"}
        cursor={"pointer"}
        as={"p"}
        zIndex={999}
      >
        <LuChevronRightCircle />
      </Button>
    </Box>
  );
};
