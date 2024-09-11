import { Box, Button, Divider, Image, Tag, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { LuChevronLeftCircle, LuChevronRightCircle } from "react-icons/lu";
import previewImage from "/src/assets/preview.jpg";
import { Link } from "react-router-dom";
import quizLogo from "/src/assets/quiz.gif";

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

export const WeeklyQuiz = () => {
  const weeklyQuizzes = useSelector((state) => state.user.weeklyQuizzes);
  const email = useSelector((state) => state.user.email);
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [isAtStart, setIsAtStart] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [activeBtn, setActiveBtn] = useState(false);
  const timersRef = useRef([]);
  const [remainingTime, setRemainingTime] = useState(null);

  const getSessionStatus = (sessionDateTime) => {
    const now = new Date();
    const sessionDate = new Date(sessionDateTime);
    const currentDate = now.toDateString();
    const sessionDateStr = sessionDate.toDateString();
    const currentTime = now.getTime();
    const sessionTime = sessionDate.getTime();
    if (sessionDateStr < currentDate) {
      return false;
    }
    if (sessionDateStr > currentDate) {
      return true;
    }
    const fiveMinutesBefore = sessionTime - 5 * 60 * 1000;
    const tenMinutesAfter = sessionTime + 70 * 60 * 1000;

    if (currentTime >= fiveMinutesBefore && currentTime <= tenMinutesAfter) {
      return "active";
    }

    if (currentTime > tenMinutesAfter) {
      return "ended";
    }

    return "inactive";
  };

  function formatDateTime(Session_Date_Time, timeOnly) {
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
    if (timeOnly) {
      return `${hours}:${formattedMinutes} ${period}`;
    }
    return formattedDateTime;
  }

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

      if (index >= weeklyQuizzes.length - 1) {
        return weeklyQuizzes.length - 1;
      }

      if (newScrollLeft > maxScrollLeft) {
        setIsAtEnd(true);
        return prevIndex;
      }

      return prevIndex + 1;
    });
  };

  const getRemainingTime = (sessionDateTime) => {
    const now = new Date();
    const sessionDate = new Date(sessionDateTime);
    const timeDiff = sessionDate.getTime() - now.getTime();
    if (timeDiff > 0) {
      const minutes = Math.floor(timeDiff / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      return { minutes, seconds };
    }
    return null;
  };

  const renderJoinNowButton = (Session_Date_Time) => {
    const fiveMinutesBefore =
      new Date(Session_Date_Time).getTime() - 5 * 60 * 1000;

    if (remainingTime && remainingTime.minutes >= 5) {
      if (remainingTime.minutes > 30) {
        const quizStartTime = new Date(fiveMinutesBefore);
        return (
          <Button fontSize={"12px"} isDisabled id={"submit-btn-active"}>
            Quiz starts at {formatDateTime(quizStartTime, true)}
          </Button>
        );
      } else {
        return (
          <Button fontSize={"12px"} isDisabled id={"submit-btn-active"}>
            Quiz starting in {remainingTime.minutes.toString().padStart(2, "0")}
            :{remainingTime.seconds.toString().padStart(2, "0")} min
          </Button>
        );
      }
    }

    return (
      <Button
        id={!activeBtn ? "submit-btn-active" : "submit-btn"}
        fontSize={"12px"}
        isDisabled={!activeBtn}
        onClick={() =>
          window.open(`https://zoom.wisechamps.com?email=${email}`, "_blank")
        }
      >
        Join Now
      </Button>
    );
  };

  useEffect(() => {
    const now = new Date();
    const initialIndex = weeklyQuizzes.findIndex((quiz) => {
      const quizDate = new Date(quiz.Session_Date_Time);
      return quizDate.toDateString() === now.toDateString();
    });
    const sessionDateTimeStr =
      initialIndex === -1 ? 0 : weeklyQuizzes[initialIndex].Session_Date_Time;
    const sessionDate = new Date(sessionDateTimeStr);
    const timer = setInterval(() => {
      const time = getRemainingTime(sessionDate);
      setRemainingTime(time);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const today = new Date();
    const initialIndex = weeklyQuizzes.findIndex((quiz) => {
      const quizDate = new Date(quiz.Session_Date_Time);
      return quizDate.toDateString() === today.toDateString();
    });
    const screenWidth = window.innerWidth;
    setIndex(
      initialIndex === -1
        ? 0
        : screenWidth > 1777
        ? initialIndex - 3
        : screenWidth > 1406
        ? initialIndex - 2
        : screenWidth > 768
        ? initialIndex - 1
        : initialIndex
    );
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
    const now = new Date();
    const initialIndex = weeklyQuizzes.findIndex((quiz) => {
      const quizDate = new Date(quiz.Session_Date_Time);
      return quizDate.toDateString() === now.toDateString();
    });
    const sessionDateTimeStr =
      initialIndex === -1 ? 0 : weeklyQuizzes[initialIndex].Session_Date_Time;
    const sessionDate = new Date(sessionDateTimeStr);
    const sessionTime = sessionDate.getTime();

    const fiveMinutesBefore = new Date(sessionTime - 5 * 60 * 1000);
    const tenMinutesAfter = new Date(sessionTime + 70 * 60 * 1000);

    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];

    if (now >= fiveMinutesBefore && now <= tenMinutesAfter) {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }

    if (now < fiveMinutesBefore) {
      timersRef.current.push(
        setTimeout(() => setActiveBtn(true), fiveMinutesBefore - now)
      );
    }

    if (now < tenMinutesAfter) {
      timersRef.current.push(
        setTimeout(() => setActiveBtn(false), tenMinutesAfter - now)
      );
    }

    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, [activeBtn]);

  return (
    <Box
      position={"relative"}
      overflow={"hidden"}
      mt={"15px"}
      background="#fff"
      borderRadius={"10px"}
      padding={"10px 0"}
      boxShadow={"rgba(0, 0, 0, 0.1) 0px 0px 20px 0px"}
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
            src={quizLogo}
            alt="📘"
            width={["55px", "55px", "60px", "65px", "70px"]}
          />
        </Text>
        <Text>Quiz Topics</Text>
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
        {weeklyQuizzes.map(
          (
            {
              Session_Video_Link,
              Session_Image_Link,
              Session_Name,
              id,
              Vevox_Survey_Link,
              Subject,
              Session_Date_Time,
              Session_Video_Link_2,
            },
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
                    ? "0 0 0 2px rgba(218,102,123,1), 8px 8px 0 0 rgba(218,102,123,1)"
                    : "rgba(0, 0, 0, 0.1) 0px 0px 20px 0px"
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
                    src={Session_Image_Link}
                    alt={Session_Name}
                    width={"100%"}
                    maxWidth={"100%"}
                    maxHeight={"180px"}
                    borderRadius={"10px"}
                    objectFit={"cover"}
                    m={"10px 0"}
                    border={"1px solid #cccccc80"}
                    fallback={
                      <Box>
                        <Image
                          src={previewImage}
                          alt={Session_Name}
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
                          {Session_Name}
                        </Text>
                      </Box>
                    }
                  />
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={"10px"}
                >
                  {Session_Video_Link && (
                    <Button
                      id="submit-btn"
                      fontSize={"12px"}
                      mb={"8px"}
                      onClick={() => window.open(Session_Video_Link, "_blank")}
                    >
                      Preview Video
                    </Button>
                  )}
                  {Session_Video_Link_2 && (
                    <Button
                      id="submit-btn"
                      fontSize={"12px"}
                      mb={"8px"}
                      onClick={() =>
                        window.open(Session_Video_Link_2, "_blank")
                      }
                    >
                      Preview Video 2
                    </Button>
                  )}
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={"10px"}
                >
                  {(getSessionStatus(Session_Date_Time) === "active" ||
                    getSessionStatus(Session_Date_Time) === "inactive" ||
                    getSessionStatus(Session_Date_Time) === "ended") &&
                    renderJoinNowButton(Session_Date_Time)}
                  {(getColorScheme(Session_Date_Time) === "linkedin" ||
                    getSessionStatus(Session_Date_Time) === "ended") && (
                    <Link
                      style={{
                        width: "100%",
                      }}
                      to={`/dashboard/missed?link=${encodeURIComponent(
                        Vevox_Survey_Link
                      )}`}
                    >
                      <Button
                        id={
                          Vevox_Survey_Link ? "submit-btn" : "submit-btn-active"
                        }
                        fontSize={"12px"}
                        loadingText={""}
                        isDisabled={!Vevox_Survey_Link}
                        padding={"0 !important"}
                      >
                        Review Questions
                      </Button>
                    </Link>
                  )}
                </Box>
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
