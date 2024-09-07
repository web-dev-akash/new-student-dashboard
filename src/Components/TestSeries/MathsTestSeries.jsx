import { Box, Button, Divider, Image, Tag, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { LuChevronLeftCircle, LuChevronRightCircle } from "react-icons/lu";
import previewImage from "/src/assets/preview.jpg";
import { Link } from "react-router-dom";
import testLogo from "/src/assets/test_logo.gif";

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

export const MathsTestSeries = () => {
  const mathsTestSeries = useSelector((state) => state.testSeries.Maths.data);
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

      if (index >= mathsTestSeries.length - 1) {
        return mathsTestSeries.length - 1;
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
            src={testLogo}
            alt="📘"
            width={["55px", "55px", "60px", "65px", "70px"]}
          />
        </Text>
        <Text>Maths Test Series</Text>
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
        {mathsTestSeries.map(
          (
            {
              Activate_Date,
              Survey_Link,
              id,
              Test_Image,
              Name,
              Recording_Link,
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
                  getColorScheme(Activate_Date) === "whatsapp"
                    ? "0 0 0 2px #8B80F9, 8px 8px 0 0 #8B80F9"
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
                    colorScheme={getColorScheme(Activate_Date)}
                    fontSize={["10px", "10px", "13px", "13px"]}
                    fontWeight={500}
                  >
                    Maths
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
                    fallbackSrc={previewImage}
                    alt={Name}
                    width={"100%"}
                    maxWidth={"100%"}
                    maxHeight={Test_Image ? "180px" : "172.5px"}
                    borderRadius={"10px"}
                    objectFit={"cover"}
                    m={"10px 0"}
                    border={"1px solid #cccccc80"}
                  />
                  {!Test_Image && (
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
                  )}
                </Box>

                <Link
                  style={{
                    width: "100%",
                  }}
                  to={`/dashboard/missed?link=${encodeURIComponent(
                    Survey_Link
                  )}`}
                >
                  <Button
                    id={
                      Survey_Link &&
                      getSessionStatus(Activate_Date) === "active"
                        ? "submit-btn"
                        : "submit-btn-active"
                    }
                    fontSize={"12px"}
                    loadingText={""}
                    isDisabled={
                      !Survey_Link ||
                      getSessionStatus(Activate_Date) === "inactive"
                    }
                    padding={"0 !important"}
                  >
                    Take Mock Test
                  </Button>
                </Link>

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
