import { Box, Text } from "@chakra-ui/react";
import { FaPhoneAlt, FaUserFriends } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ReferralSteps } from "../Components/Referral/ReferralSteps";
import { InviteButton } from "../Components/InviteButton/InviteButton";
import { useEffect } from "react";

export const Referrals = () => {
  const referrals = useSelector((state) => state.user.referrals);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Box
      bg={"#E7E6FF"}
      padding={[
        "2.5rem 0.7rem 6rem",
        "2.5rem 0.7rem 6rem",
        "4rem 1.5rem 1.5rem",
        "4rem 1.5rem 1.5rem",
      ]}
      minHeight={"100vh"}
    >
      <Box mt={"15px"}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Text fontWeight={500} fontSize={["14px", "14px", "16px", "16px"]}>
              Total Referrals
            </Text>
            <Text
              fontWeight={700}
              display={"flex"}
              alignItems={"center"}
              gap={"5px"}
              fontSize={["30px", "30px", "35px", "40px"]}
              m={"0px 0 8px 0"}
            >
              {referrals.length}
              <FaUserFriends />
            </Text>
          </Box>
          <InviteButton />
        </Box>
        {referrals.length === 0 && (
          <Box
            gridColumn={["unset", "unset", "1 / span 2", "1 / span 2"]}
            minHeight={["300px", "300px", "300px", "200px", "300px"]}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text
              fontWeight={700}
              fontSize={["30px"]}
              textAlign={"center"}
              opacity={0.3}
            >
              No Referrals <br /> Found
            </Text>
          </Box>
        )}
        <Box
          className="animate__animated animate__fadeInUp"
          display={"grid"}
          gridTemplateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap={"15px"}
        >
          {referrals.map(({ Student_Name, Phone, id, quizAttempted }) => (
            <Box
              key={id}
              bg={"white"}
              minHeight={"100px"}
              borderRadius={"15px"}
              padding={"1rem"}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Text fontSize={["15px", "15px", "18px", "18px"]}>
                  {Student_Name}
                </Text>
                <Text
                  fontSize={"12px"}
                  display={"flex"}
                  gap={"5px"}
                  alignItems={"center"}
                >
                  <FaPhoneAlt />
                  <Text>{Phone}</Text>
                </Text>
              </Box>
              <Box>
                <ReferralSteps quizAttempted={quizAttempted} />
              </Box>
              <Box
                width={"100%"}
                backgroundColor={"#e1dfff"}
                borderRadius={"50px"}
                overflow={"hidden"}
                mt={"-10px"}
                height={"30px"}
                position={"relative"}
                textAlign={"center"}
                padding={"4px"}
              >
                <Box
                  background={"#4E46E4"}
                  height={"100%"}
                  width={
                    quizAttempted >= 8
                      ? `100%`
                      : quizAttempted === 4
                      ? `${quizAttempted * 14}%`
                      : `${quizAttempted * 12.5}%`
                  }
                  borderRadius={"50px"}
                  zIndex={0}
                ></Box>
                <Text
                  fontSize={"13px"}
                  position={"relative"}
                  top={"-21px"}
                  color={quizAttempted < 4 ? "black" : "white"}
                  zIndex={1}
                >
                  {quizAttempted >= 8 ? 8 : quizAttempted}/8
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
