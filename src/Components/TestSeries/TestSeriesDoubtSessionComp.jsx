/* eslint-disable no-unused-vars */
import { Box, Button, Divider, Image, Tag, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { LuChevronLeftCircle, LuChevronRightCircle } from "react-icons/lu";
import previewImage from "/src/assets/preview.jpg";
import { Link } from "react-router-dom";
import doubtLogo from "/src/assets/doubt_logo.gif";
import moment from "moment/moment";

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

export const TestSeriesDoubtSessionComp = () => {
  const maths = useSelector((state) => state.user.testSeries.Maths);
  const science = useSelector((state) => state.user.testSeries.Science);
  const english = useSelector((state) => state.user.testSeries.English);

  const allSubjects = {
    Maths: maths,
    Science: science,
    English: english,
  };

  const [status, setStatus] = useState("inactive");

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
    const updateButtonStatus = () => {
      const dateTimeStr =
        doubtSessions[0]?.Session_Date_Time ||
        `${moment("YYYY-MM-DD")}T17:00:00+05:30`;
      const newStatus = getSessionStatus(dateTimeStr);
      setStatus(newStatus);
    };

    updateButtonStatus();

    const intervalId = setInterval(updateButtonStatus, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
    const filteredDoubtSessions = doubtSessions.filter(
      (session) => allSubjects[session.Subject]
    );
    setFinalSesisons(filteredDoubtSessions);
  }, [doubtSessionStatus]);

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
                boxShadow={"rgba(0, 0, 0, 0.1) 0px 0px 20px 0px"}
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
                    colorScheme={"whatsapp"}
                    fontSize={["10px", "10px", "13px", "13px"]}
                    fontWeight={500}
                  >
                    {Subject}
                  </Tag>
                  <Tag
                    borderRadius={"50px"}
                    padding={"5px 10px"}
                    size={["sm", "sm", "md", "md"]}
                    colorScheme={"whatsapp"}
                    fontSize={["10px", "10px", "13px", "13px"]}
                    fontWeight={500}
                  >
                    {formatDateTime(Session_Date_Time)}
                  </Tag>
                </Box>
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
                >
                  Join Now
                </Button>
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
                      loadingText={""}
                      isDisabled={!Recording_Link}
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
