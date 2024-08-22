import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Fade,
  Tag,
  Text,
} from "@chakra-ui/react";
import { CgArrowBottomLeftR, CgArrowTopRightR } from "react-icons/cg";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Loading } from "../Loading/Loading";
import { ClickBtn } from "../ClickBtn/ClickBtn";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import scrollDown from "/src/Lottie/ScrollDown.json";
import { PlansAndPricing } from "../Pricing/PlansAndPricing";

export const QuizBalance = () => {
  const paymentHistory = useSelector((state) => state.paymentHistory);
  const quizzes = useSelector((state) => state.user.quizzes);
  const credits = useSelector((state) => state.user.credits);
  const [history, setHistory] = useState(null);
  const lottieRef = useRef(null);
  const [isTop, setIsTop] = useState(true);
  const panelRef = useRef(null);
  const quizBalanaceRef = useRef(null);

  let wordsToRemove = [
    "Final",
    "&",
    "Math",
    "Science",
    "English",
    "GK",
    "Grade",
    "Live",
    "Quiz",
    "for",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "November",
    "December",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Group",
    "Olympiad",
    "Level",
    "School",
  ];

  const originalSessionName = (sessionName) => {
    if (!sessionName) {
      return "Maths Quiz";
    }
    let newString = sessionName.toString();
    let regexString = wordsToRemove.join("|");
    let regex = new RegExp("\\b(" + regexString + ")\\b|\\d+|&|[()]", "gi");
    newString = newString.replace(regex, "");
    if (newString.trim() === "") {
      return "Maths Quiz";
    }
    return newString.trim();
  };

  const handleQuizBalanceBtnClick = () => {
    quizBalanaceRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const combinedArray = quizzes
      .map((quiz) => ({
        ...quiz,
        date: quiz.Session_Date_Time
          ? new Date(quiz.Session_Date_Time)
          : new Date(quiz.createdTime),
        type: "quiz",
      }))
      .concat(
        paymentHistory.map((payment) => ({
          ...payment,
          date: new Date(payment.Payment_Date),
          type: "payment",
        }))
      );
    combinedArray.sort((a, b) => b.date - a.date);
    setHistory(combinedArray);
  }, []);

  const handleScroll = () => {
    if (panelRef.current?.scrollTop > 0) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  };

  useEffect(() => {
    const panel = panelRef.current;
    panel?.addEventListener("scroll", handleScroll);

    return () => {
      panel?.removeEventListener("scroll", handleScroll);
    };
  }, [history]);

  if (!quizzes || !quizzes.length) {
    return <Loading />;
  }

  return (
    <Box
      bg={"#E7E6FF"}
      padding={[
        "3rem 0.7rem 6.5rem",
        "3rem 0.7rem 6.5rem",
        "4.5rem 1.5rem 1.5rem",
        "4.5rem 1.5rem 1.5rem",
      ]}
      minHeight={"100vh"}
    >
      <Box mt={"15px"}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          position={"relative"}
        >
          <Box>
            <Text fontWeight={700} fontSize={["29px", "30px", "35px", "40px"]}>
              {credits}
              <Text
                as={"span"}
                position={"relative"}
                bottom={["1px", "1px", "2px", "3px"]}
                ml={"2px"}
                fontSize={["14px", "15px", "17px", "18px"]}
                opacity={"0.9"}
              >
                Quiz Balance Left
              </Text>
            </Text>
          </Box>
          <Button
            onClick={handleQuizBalanceBtnClick}
            bg={"#4E46E4"}
            color={"white"}
            fontSize={["12px", "13px", "14px", "15px"]}
            fontWeight={500}
            paddingInline={["10px", "10px", "20px", "20px"]}
            border={"2px solid transparent"}
            _hover={{
              bg: "#fff",
              color: "#4E46E4",
              outline: "none",
              borderColor: "#4E46E4",
              boxShadow: "0 0 0px 4px #4E46E450",
            }}
          >
            Add Quiz Balance
          </Button>
          <ClickBtn style={{ top: 8, zIndex: 99 }} />
        </Box>
        <Divider
          m={"10px 0 15px 0"}
          border={"1.3px solid #4e46e4"}
          borderRadius={"2px"}
        />

        {history && (
          <Accordion allowToggle>
            <AccordionItem
              border={"none"}
              borderRadius={"10px"}
              overflow={"hidden"}
            >
              <h2
                style={{
                  background: "white",
                  borderRadius: "10px 10px 0 0",
                }}
              >
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontSize={["13px", "13px", "14px", "15px"]}
                    padding={"3px 0"}
                    fontWeight={600}
                  >
                    My Quiz Balance History ({quizzes.length} Quiz Balance used)
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel
                p={0}
                maxHeight={"45vh"}
                overflowX={"hidden"}
                overflowY={"auto"}
                position={"relative"}
                ref={panelRef}
              >
                <Fade in={isTop}>
                  <Lottie
                    animationData={scrollDown}
                    loop={true}
                    autoPlay={false}
                    lottieRef={lottieRef}
                    style={{
                      width: "150px",
                      position: "absolute",
                      bottom: "-45px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      opacity: 0.5,
                    }}
                  />
                </Fade>
                <Box bg={"white"} padding={"0px 10px"} id="transactions">
                  {history.map((item) => {
                    return item.type === "payment" ? (
                      <Box
                        key={item.id}
                        bg={"white"}
                        padding={"10px 0"}
                        borderBottom={"1px solid #e0e0e0"}
                      >
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            gap={"5px"}
                          >
                            <Box
                              display={"flex"}
                              bg={"#e7e6ff"}
                              minWidth={"38px"}
                              minHeight={"38px"}
                              borderRadius={"10px"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              fontSize={["16px", "16px", "17px", "18px"]}
                            >
                              <CgArrowBottomLeftR />
                            </Box>
                            <Box
                              display={"flex"}
                              alignItems={"flex-start"}
                              justifyContent={"center"}
                              flexDirection={"column"}
                            >
                              <Text
                                isTruncated
                                fontWeight={600}
                                fontSize={["12px", "12px", "14px", "15px"]}
                                maxWidth={["210px", "400px", "600px", "900px"]}
                              >
                                Quiz Balance Added
                              </Text>
                              <Text
                                display={"flex"}
                                gap={"2px"}
                                alignItems={"center"}
                                fontSize={["11px", "11px", "12px", "13px"]}
                              >
                                <FaRupeeSign />
                                <Text fontWeight={500}>{item.Amount}</Text>
                              </Text>
                            </Box>
                          </Box>
                          <Box
                            display={"flex"}
                            alignItems={"flex-end"}
                            justifyContent={"center"}
                            flexDirection={"column"}
                          >
                            <Tag
                              fontSize={["10px", "11px", "13px", "15px"]}
                              colorScheme="whatsapp"
                              size={["sm", "sm", "md", "md"]}
                              whiteSpace={"nowrap"}
                            >
                              +{item.Credits} Quiz Balance
                            </Tag>
                            <Text
                              fontSize={["10px", "11px", "13px", "13px"]}
                              fontWeight={500}
                            >
                              {new Date(item.date).toLocaleDateString("en", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              })}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        key={item.id}
                        bg={"white"}
                        padding={"10px 0"}
                        borderBottom={"1px solid #e0e0e0"}
                      >
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            gap={"5px"}
                          >
                            <Box
                              display={"flex"}
                              bg={"#e7e6ff"}
                              minWidth={"38px"}
                              minHeight={"38px"}
                              borderRadius={"10px"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              fontSize={["16px", "16px", "17px", "18px"]}
                            >
                              <CgArrowTopRightR />
                            </Box>
                            <Box
                              display={"flex"}
                              alignItems={"flex-start"}
                              justifyContent={"center"}
                              flexDirection={"column"}
                              gap={"2px"}
                            >
                              <Text
                                isTruncated
                                fontWeight={600}
                                fontSize={["12px", "12px", "14px", "15px"]}
                                maxWidth={["170px", "400px", "600px", "900px"]}
                              >
                                {originalSessionName(item.Session_Name)}
                              </Text>
                              <Text
                                fontWeight={500}
                                fontSize={["11px", "11px", "12px", "13px"]}
                              >
                                Quiz Score : {item.Quiz_Score}
                              </Text>
                            </Box>
                          </Box>
                          <Box
                            display={"flex"}
                            alignItems={"flex-end"}
                            justifyContent={"center"}
                            flexDirection={"column"}
                            gap={"2px"}
                            overflow={"hidden"}
                          >
                            <Tag
                              fontSize={["10px", "11px", "13px", "15px"]}
                              colorScheme="pink"
                              size={["sm", "sm", "md", "md"]}
                              whiteSpace={"nowrap"}
                            >
                              -1 Quiz Balance
                            </Tag>
                            <Text
                              fontSize={["10px", "11px", "13px", "13px"]}
                              fontWeight={500}
                            >
                              {new Date(item.date).toLocaleDateString("en", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              })}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        )}
        <Box ref={quizBalanaceRef}>
          <PlansAndPricing />
        </Box>
      </Box>
    </Box>
  );
};
