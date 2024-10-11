import {
  Avatar,
  Box,
  ChakraProvider,
  Divider,
  Image,
  SimpleGrid,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { IoTrophySharp } from "react-icons/io5";
import { RiDiscountPercentFill, RiUserSharedFill } from "react-icons/ri";
import { FaGift, FaRankingStar } from "react-icons/fa6";
import { GiNotebook, GiTwoCoins } from "react-icons/gi";

import place1 from "/src/assets/1st.png";
import place2 from "/src/assets/2nd.png";
import place3 from "/src/assets/3rd.png";
import place4 from "/src/assets/4th.png";
import place5 from "/src/assets/5th.png";
import { ConfettiComponent } from "../Components/ConfettiComponent/ConfettiComponent";
import { getWinnersData } from "../Redux/action";
import { Loading } from "../Components/Loading/Loading";
import logo from "/images/logo.png";
import { useDynamicStatusBarColor } from "../Components/DynamicStatusBarColor";

export const WeeklyWinners = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state) => state.user);
  const winners = useSelector((state) => state.winners);
  const [isWinner, setIsWinner] = useState(false);
  const alreadyShown = sessionStorage.getItem("wise_winner");

  const top5 = {
    1: place1,
    2: place2,
    3: place3,
    4: place4,
    5: place5,
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (!alreadyShown && winners?.status === 200) {
      const arraysToCheck = [
        winners.topFiveUsers,
        winners.topFivePercentageUsers,
        [winners.maxReferrals],
        winners.maxOrders,
        [winners.maxCoins],
        [winners.maxQuizTaker],
        winners.megaLuckyDraw,
      ];
      for (const array of arraysToCheck) {
        if (array?.some((item) => item.Email === user.email)) {
          setIsWinner(true);
          sessionStorage.setItem("wise_winner", true);
          toast({
            title: "Congratulations",
            description: "You are one of the weekly winners",
            duration: 5000,
            isClosable: true,
            status: "success",
            position: "top",
          });
          return;
        }
      }
    }
  }, [isWinner]);

  useEffect(() => {
    if (!winners || !winners.status || winners.status !== 200) {
      dispatch(getWinnersData(user.grade));
    }
  }, []);

  useDynamicStatusBarColor("#E7E6FF");

  if (!winners || !winners.status || winners.status !== 200) {
    return <Loading />;
  }

  return (
    <>
      <ChakraProvider disableGlobalStyle>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          position={"absolute"}
          width={"100%"}
          padding={[
            "5px 11px 5px 11px",
            "5px 11px 5px 11px",
            "10px 1.4rem 10px 1.4rem",
            "10px 1.4rem 10px 1.4rem",
            "10px 1.4rem 10px 1.4rem",
          ]}
          top={0}
          left={0}
        >
          <header>
            <Image
              src={logo}
              alt="Wisechamps"
              width={["140px", "140px", "170px", "170px"]}
              onClick={() => navigate("/")}
            />
          </header>
          <Link to={"/"}>
            <Text
              fontSize={["11px", "11px", "13px", "14px"]}
              padding={"5px 15px"}
              fontWeight={600}
              background={"#4E46E4"}
              border={"1px solid #4E46E4"}
              borderRadius={"5px"}
              color={"white"}
            >
              Back
            </Text>
          </Link>
        </Box>
        {isWinner && <ConfettiComponent />}
        <Box
          bg={"#E7E6FF"}
          padding={[
            "2.5rem 0.7rem 2rem",
            "2.5rem 0.7rem 2rem",
            "3.5rem 1.5rem 2rem",
            "3.5rem 1.5rem 2rem",
          ]}
          minHeight={"100vh"}
        >
          <Box marginBlock={"15px"}>
            <Text
              fontWeight={700}
              fontSize={["20px", "21px", "23px", "24px", "25px"]}
            >
              Weekly Winners
            </Text>
          </Box>
          <SimpleGrid
            mt={"15px"}
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          >
            {winners.topFiveUsers?.length > 0 && (
              <Box padding={"1rem"} bg={"#fff"} borderRadius={"10px"}>
                <Box display={"flex"} alignItems={"center"} gap={"20px"}>
                  <Box
                    padding={"12px"}
                    bg={"#000"}
                    borderRadius={"7px"}
                    width={"max-content"}
                  >
                    <IoTrophySharp
                      style={{ color: "white", fontSize: "25px" }}
                    />
                  </Box>
                  <Text
                    fontSize={["18px", "19px", "20px", "21px", "22px"]}
                    fontWeight={600}
                  >
                    Top 3 Scorers
                  </Text>
                </Box>
                <Divider m={"15px 0"} />
                {winners.topFiveUsers.map(
                  ({ contactId, Student_Name }, index) => (
                    <Box
                      key={contactId}
                      display={"flex"}
                      alignItems={"center"}
                      gap={"15px"}
                      mb={"10px"}
                    >
                      <Image
                        src={top5[index + 1]}
                        alt="rank"
                        width={["40px", "40px", "50px", "50px", "50px"]}
                      />
                      <Box>
                        <Text
                          fontWeight={500}
                          fontSize={["17px", "18px", "19px", "20px", "21px"]}
                          textTransform={"capitalize"}
                        >
                          {Student_Name?.toLowerCase()}
                        </Text>
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            )}
            {winners.topFivePercentageUsers?.length > 0 && (
              <Box padding={"1rem"} bg={"#fff"} borderRadius={"10px"}>
                <Box display={"flex"} alignItems={"center"} gap={"20px"}>
                  <Box
                    padding={"10px"}
                    bg={"#000"}
                    borderRadius={"7px"}
                    width={"max-content"}
                  >
                    <RiDiscountPercentFill
                      style={{ color: "#fff", fontSize: "30px" }}
                    />
                  </Box>
                  <Text
                    fontSize={["18px", "19px", "20px", "21px", "22px"]}
                    fontWeight={600}
                  >
                    Top 3 Percentage
                  </Text>
                </Box>
                <Divider m={"15px 0"} />
                {winners.topFivePercentageUsers.map(
                  ({ contactId, Student_Name }, index) => (
                    <Box
                      key={contactId}
                      display={"flex"}
                      alignItems={"center"}
                      gap={"15px"}
                      mb={"10px"}
                    >
                      <Image
                        src={top5[index + 1]}
                        alt="rank"
                        width={["40px", "40px", "50px", "50px", "50px"]}
                      />
                      <Box>
                        <Text
                          fontWeight={500}
                          fontSize={["17px", "18px", "19px", "20px", "21px"]}
                          isTruncated
                          maxWidth={[
                            "260px",
                            "270px",
                            "250px",
                            "230px",
                            "250px",
                          ]}
                          textTransform={"capitalize"}
                        >
                          {Student_Name?.toLowerCase()}
                        </Text>
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            )}
            {winners.maxOrders?.length > 0 && (
              <Box padding={"1rem"} bg={"#fff"} borderRadius={"10px"}>
                <Box display={"flex"} alignItems={"center"} gap={"20px"}>
                  <Box
                    padding={"12px"}
                    bg={"#000"}
                    borderRadius={"7px"}
                    width={"max-content"}
                  >
                    <FaGift style={{ color: "#fff", fontSize: "25px" }} />
                  </Box>
                  <Text
                    fontSize={["18px", "19px", "20px", "21px", "22px"]}
                    fontWeight={600}
                  >
                    Gifts Earned from Coins
                  </Text>
                </Box>
                <Divider m={"15px 0"} />
                {winners.maxOrders.map(
                  ({ id, Student_Name, Total_Orders, Student_Grade }) => (
                    <Box
                      key={id}
                      display={"flex"}
                      alignItems={"center"}
                      gap={"15px"}
                      mb={"10px"}
                    >
                      <Avatar
                        name={Student_Name}
                        width={["45px", "45px", "45px", "45px", "50px"]}
                        height={["45px", "45px", "45px", "45px", "50px"]}
                      />
                      <Box>
                        <Text
                          fontWeight={500}
                          fontSize={["17px", "18px", "19px", "20px", "21px"]}
                          isTruncated
                          maxWidth={[
                            "260px",
                            "270px",
                            "250px",
                            "230px",
                            "250px",
                          ]}
                          textTransform={"capitalize"}
                        >
                          {Student_Name?.toLowerCase()}
                        </Text>
                        <Tag
                          colorScheme="purple"
                          fontWeight={500}
                          fontSize={["13px", "14px", "15px", "15px", "16px"]}
                        >
                          {Total_Orders === 1
                            ? Total_Orders + " Gift"
                            : Total_Orders + " Gifts"}
                        </Tag>
                        <Tag
                          ml={1}
                          as={"span"}
                          colorScheme="purple"
                          fontWeight={500}
                          fontSize={["13px", "14px", "15px", "15px", "16px"]}
                        >
                          Grade {Student_Grade}
                        </Tag>
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            )}
            {winners.maxReferrals?.length > 0 && (
              <Box padding={"1rem"} bg={"#fff"} borderRadius={"10px"}>
                <Box display={"flex"} alignItems={"center"} gap={"20px"}>
                  <Box
                    padding={"12px"}
                    bg={"#000"}
                    borderRadius={"7px"}
                    width={"max-content"}
                  >
                    <RiUserSharedFill
                      style={{ color: "#fff", fontSize: "25px" }}
                    />
                  </Box>
                  <Text
                    fontSize={["18px", "19px", "20px", "21px", "22px"]}
                    fontWeight={600}
                  >
                    Highest Referrals
                  </Text>
                </Box>
                <Divider m={"15px 0"} />

                {winners.maxReferrals.map(
                  ({ id, Student_Name, Referral_Count, Student_Grade }) => (
                    <Box
                      key={id}
                      display={"flex"}
                      alignItems={"center"}
                      gap={"15px"}
                      mb={"10px"}
                    >
                      <Avatar
                        name={Student_Name}
                        width={["45px", "45px", "45px", "45px", "50px"]}
                        height={["45px", "45px", "45px", "45px", "50px"]}
                      />
                      <Box>
                        <Text
                          fontWeight={500}
                          fontSize={["17px", "18px", "19px", "20px", "21px"]}
                          isTruncated
                          maxWidth={[
                            "260px",
                            "270px",
                            "250px",
                            "230px",
                            "250px",
                          ]}
                          textTransform={"capitalize"}
                        >
                          {Student_Name?.toLowerCase()}
                        </Text>
                        <Tag
                          colorScheme="purple"
                          fontWeight={500}
                          fontSize={["13px", "14px", "15px", "15px", "16px"]}
                        >
                          {Referral_Count === 1
                            ? Referral_Count + " Referral"
                            : Referral_Count + " Referrals"}
                        </Tag>
                        <Tag
                          ml={1}
                          as={"span"}
                          colorScheme="purple"
                          fontWeight={500}
                          fontSize={["13px", "14px", "15px", "15px", "16px"]}
                        >
                          Grade {Student_Grade}
                        </Tag>
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            )}
            {winners.maxCoins?.length > 0 && (
              <Box padding={"1rem"} bg={"#fff"} borderRadius={"10px"}>
                <Box display={"flex"} alignItems={"center"} gap={"20px"}>
                  <Box
                    padding={"12px"}
                    bg={"#000"}
                    borderRadius={"7px"}
                    width={"max-content"}
                  >
                    <GiTwoCoins style={{ color: "#fff", fontSize: "25px" }} />
                  </Box>
                  <Text
                    fontSize={["18px", "19px", "20px", "21px", "22px"]}
                    fontWeight={600}
                  >
                    Max Coins Earned
                  </Text>
                </Box>
                <Divider m={"15px 0"} />
                {winners.maxCoins.map(
                  ({ id, Student_Name, Student_Grade, Coins }) => (
                    <Box
                      key={id}
                      display={"flex"}
                      alignItems={"center"}
                      gap={"15px"}
                      mb={"10px"}
                    >
                      <Avatar
                        name={Student_Name}
                        width={["45px", "45px", "50px", "50px", "55px"]}
                        height={["45px", "45px", "50px", "50px", "55px"]}
                      />
                      <Box>
                        <Text
                          fontWeight={500}
                          fontSize={["17px", "18px", "19px", "20px", "21px"]}
                          isTruncated
                          maxWidth={[
                            "260px",
                            "270px",
                            "250px",
                            "230px",
                            "250px",
                          ]}
                          textTransform={"capitalize"}
                        >
                          {Student_Name?.toLowerCase()}
                        </Text>
                        <Text mt={"2px"}>
                          <Tag
                            as={"span"}
                            colorScheme="purple"
                            fontWeight={500}
                            fontSize={["13px", "14px", "15px", "15px", "16px"]}
                          >
                            {Coins} Coins
                          </Tag>
                          <Tag
                            ml={1}
                            as={"span"}
                            colorScheme="purple"
                            fontWeight={500}
                            fontSize={["13px", "14px", "15px", "15px", "16px"]}
                          >
                            Grade {Student_Grade}
                          </Tag>
                        </Text>
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            )}
            {winners.maxQuizTaker?.length > 0 && (
              <Box padding={"1rem"} bg={"#fff"} borderRadius={"10px"}>
                <Box display={"flex"} alignItems={"center"} gap={"20px"}>
                  <Box
                    padding={"12px"}
                    bg={"#000"}
                    borderRadius={"7px"}
                    width={"max-content"}
                  >
                    <GiNotebook
                      style={{
                        color: "#fff",
                        fontSize: "25px",
                        transform: "rotate(-15deg)",
                      }}
                    />
                  </Box>
                  <Text
                    fontSize={["18px", "19px", "20px", "21px", "22px"]}
                    fontWeight={600}
                  >
                    Max Quiz Taken
                  </Text>
                </Box>
                <Divider m={"15px 0"} />
                {winners.maxQuizTaker.map(
                  ({ id, Student_Name, Total_Attempts, Student_Grade }) => (
                    <Box
                      key={id}
                      display={"flex"}
                      alignItems={"center"}
                      gap={"15px"}
                      mb={"10px"}
                    >
                      <Avatar
                        name={Student_Name}
                        width={["45px", "45px", "50px", "50px", "55px"]}
                        height={["45px", "45px", "50px", "50px", "55px"]}
                      />
                      <Box>
                        <Text
                          fontWeight={500}
                          fontSize={["17px", "18px", "19px", "20px", "21px"]}
                          isTruncated
                          maxWidth={[
                            "260px",
                            "270px",
                            "250px",
                            "230px",
                            "250px",
                          ]}
                          textTransform={"capitalize"}
                        >
                          {Student_Name?.toLowerCase()}
                        </Text>
                        <Text mt={"2px"}>
                          <Tag
                            as={"span"}
                            colorScheme="purple"
                            fontWeight={500}
                            fontSize={["13px", "14px", "15px", "15px", "16px"]}
                          >
                            {Total_Attempts} Attempts
                          </Tag>
                          <Tag
                            ml={1}
                            as={"span"}
                            colorScheme="purple"
                            fontWeight={500}
                            fontSize={["13px", "14px", "15px", "15px", "16px"]}
                          >
                            Grade {Student_Grade}
                          </Tag>
                        </Text>
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            )}
            {winners.megaLuckyDraw?.length > 0 && (
              <Box padding={"1rem"} bg={"#fff"} borderRadius={"10px"}>
                <Box display={"flex"} alignItems={"center"} gap={"20px"}>
                  <Box
                    padding={"12px"}
                    bg={"#000"}
                    borderRadius={"7px"}
                    width={"max-content"}
                  >
                    <FaRankingStar
                      style={{ color: "#fff", fontSize: "25px" }}
                    />
                  </Box>
                  <Text
                    fontSize={["18px", "19px", "20px", "21px", "22px"]}
                    fontWeight={600}
                  >
                    Mega Lucky Draw Winners
                  </Text>
                </Box>
                <Divider m={"15px 0"} />
                {winners.megaLuckyDraw.map(
                  ({ id, Student_Name, Coins, Student_Grade }) => (
                    <Box
                      key={id}
                      display={"flex"}
                      alignItems={"center"}
                      gap={"15px"}
                      mb={"10px"}
                    >
                      <Avatar
                        name={Student_Name}
                        width={["45px", "45px", "45px", "45px", "50px"]}
                        height={["45px", "45px", "45px", "45px", "50px"]}
                      />
                      <Box>
                        <Text
                          fontWeight={500}
                          fontSize={["17px", "18px", "19px", "20px", "21px"]}
                          isTruncated
                          maxWidth={[
                            "260px",
                            "270px",
                            "250px",
                            "230px",
                            "250px",
                          ]}
                          textTransform={"capitalize"}
                        >
                          {Student_Name?.toLowerCase()}
                        </Text>
                        <Tag
                          as={"span"}
                          colorScheme="purple"
                          fontWeight={500}
                          fontSize={["13px", "14px", "15px", "15px", "16px"]}
                        >
                          {Coins} Coins
                        </Tag>
                        <Tag
                          ml={1}
                          as={"span"}
                          colorScheme="purple"
                          fontWeight={500}
                          fontSize={["13px", "14px", "15px", "15px", "16px"]}
                        >
                          Grade {Student_Grade}
                        </Tag>
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            )}
          </SimpleGrid>
        </Box>
      </ChakraProvider>
    </>
  );
};
