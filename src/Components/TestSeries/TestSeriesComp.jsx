import { Box, Button, Card, Divider, Image, Tag, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { LuChevronLeftCircle, LuChevronRightCircle } from "react-icons/lu";
import previewImage from "/src/assets/preview.jpg";
import { Link, useNavigate } from "react-router-dom";
import mathLogo from "/src/assets/math_logo.gif";

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export const TestSeriesComp = () => {
  const navigate = useNavigate();
  const maths = useSelector((state) => state.user.testSeries.Maths);
  const science = useSelector((state) => state.user.testSeries.Science);
  const english = useSelector((state) => state.user.testSeries.English);
  const testSeries = useSelector((state) => state.testSeries.data);

  const allSubjects = {
    Maths: maths,
    Science: science,
    English: english,
  };

  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [isAtStart, setIsAtStart] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const getSessionStatus = (sessionDateTime) => {
    const now = new Date();
    const sessionDate = new Date(sessionDateTime);

    const currentDate = now.setHours(0, 0, 0, 0);
    const sessionDateOnly = sessionDate.setHours(0, 0, 0, 0);

    if (currentDate >= sessionDateOnly) {
      return "active";
    }
    return "inactive";
  };

  function formatDateTime(Session_Date_Time) {
    const dateObj = new Date(Session_Date_Time);
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];

    const formattedDateTime = `${day} ${month}`;
    return formattedDateTime;
  }

  const getColorScheme = (Session_Date_Time) => {
    const sessionDate = new Date(Session_Date_Time);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    const endOfWeek = new Date(today);

    startOfWeek.setDate(
      today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
    );

    startOfWeek.setHours(0, 0, 0, 0);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    if (sessionDate < startOfWeek) {
      return "linkedin";
    }

    if (sessionDate > endOfWeek) {
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

      if (index >= testSeries.length - 1) {
        return testSeries.length - 1;
      }

      if (newScrollLeft > maxScrollLeft) {
        setIsAtEnd(true);
        return prevIndex;
      }

      return prevIndex + 1;
    });
  };

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

  return (
    <Box
      position={"relative"}
      overflow={"hidden"}
      mt={"15px"}
      background="#fff"
      borderRadius={"10px"}
      padding={"10px 0"}
      boxShadow={"rgba(0, 0, 0, 0.1) 0px 0px 20px 0px"}
      display={testSeries.length === 0 ? "none" : "block"}
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
            src={mathLogo}
            alt="📘"
            width={["55px", "55px", "60px", "65px", "70px"]}
          />
        </Text>
        <Text>Mock Test Series</Text>
      </Box>
      <Divider border={"1.1px solid #5838fc"} marginBlock={"5px 2px"} />
      <Box
        padding={"20px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={
          testSeries.length <= 3
            ? ["space-evenly", "space-evenly", "space-evenly", "center"]
            : "space-evenly"
        }
        gap={"18px"}
        flexWrap={"nowrap"}
        overflowX={"auto"}
        scrollSnapType={"x mandatory"}
        width={"100%"}
        maxWidth={"100%"}
        ref={containerRef}
        id="quizScroller"
      >
        {testSeries.map(
          (
            { Activate_Date, Survey_Link, id, Test_Image, Name, Subject, Free },
            idx
          ) => {
            if (!itemRefs.current[idx]) {
              itemRefs.current[idx] = React.createRef();
            }
            return (
              <Box
                key={id}
                bg={"#fff"}
                padding={"15px"}
                borderRadius={"20px"}
                alignSelf={"stretch"}
                ref={itemRefs.current[idx]}
                scrollSnapAlign={"center"}
                minWidth={"260px"}
                position={"relative"}
                boxShadow={
                  getColorScheme(Activate_Date) === "whatsapp" &&
                  (allSubjects[Subject] || Free)
                    ? "0 0 0 2px #8B80F9, 8px 8px 0 0 #8B80F9"
                    : "rgba(0, 0, 0, 0.1) 0px 0px 20px 0px"
                }
              >
                {!allSubjects[Subject] && !Free && (
                  <>
                    <Box
                      position={"absolute"}
                      top={"50%"}
                      left={"50%"}
                      transform={"translate(-50%, -50%)"}
                      zIndex={998}
                      textAlign={"center"}
                    >
                      <Card id="paid-card">
                        <Text mb={3}>
                          Buy {Subject} Test Series <br /> to Continue..
                        </Text>
                        <Button
                          onClick={() => navigate("/test-series")}
                          colorScheme="purple"
                          width={"min-content"}
                          margin={"0 auto"}
                          padding={"5px 20px"}
                        >
                          Buy Now
                        </Button>
                      </Card>
                    </Box>
                  </>
                )}
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Tag
                    borderRadius={"50px"}
                    padding={"5px 10px"}
                    size={["sm", "sm", "md", "md"]}
                    colorScheme={getColorScheme(Activate_Date)}
                    fontSize={["10px", "10px", "13px", "13px"]}
                    fontWeight={500}
                  >
                    {Subject}
                  </Tag>
                  <Tag
                    borderRadius={"50px"}
                    padding={"5px 10px"}
                    size={["sm", "sm", "md", "md"]}
                    colorScheme={getColorScheme(Activate_Date)}
                    fontSize={["10px", "10px", "13px", "13px"]}
                    fontWeight={500}
                  >
                    {formatDateTime(Activate_Date)}
                  </Tag>
                </Box>
                <Box position={"relative"}>
                  <Image
                    src={Test_Image}
                    alt={Name}
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
                </Box>

                <Link
                  style={{
                    width: "100%",
                  }}
                  to={
                    getSessionStatus(Activate_Date) === "inactive" ||
                    (!allSubjects[Subject] && !Free)
                      ? ""
                      : `/dashboard/missed?link=${encodeURIComponent(
                          Survey_Link
                        )}`
                  }
                >
                  <Button
                    id={
                      Survey_Link &&
                      getSessionStatus(Activate_Date) === "active"
                        ? "submit-btn"
                        : "submit-btn-active"
                    }
                    fontSize={"12px"}
                    isDisabled={
                      !Survey_Link ||
                      getSessionStatus(Activate_Date) === "inactive" ||
                      (!allSubjects[Subject] && !Free)
                    }
                    padding={"0 !important"}
                  >
                    Take Mock Test
                  </Button>
                </Link>
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
        top={"57%"}
        transform={"translateY(-57%)"}
        left={"-10px"}
        outline={"none"}
        padding={"0"}
        cursor={"pointer"}
        as={"p"}
        zIndex={999}
        display={
          testSeries.length <= 3 ? ["flex", "flex", "flex", "none"] : "flex"
        }
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
        top={"57%"}
        transform={"translateY(-57%)"}
        right={"-10px"}
        outline={"none"}
        padding={"0"}
        cursor={"pointer"}
        as={"p"}
        zIndex={999}
        display={
          testSeries.length <= 3 ? ["flex", "flex", "flex", "none"] : "flex"
        }
      >
        <LuChevronRightCircle />
      </Button>
    </Box>
  );
};
