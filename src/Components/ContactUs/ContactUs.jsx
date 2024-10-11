import {
  Box,
  Button,
  Image,
  InputGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiPhoneFill, RiWhatsappFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import contact_us from "/src/assets/contact_us.png";
import { useDynamicStatusBarColor } from "../DynamicStatusBarColor";

export const ContactUs = () => {
  const toast = useToast();
  const user = useSelector((state) => state.user);
  const [tempLoading, setTempLoading] = useState(false);
  const [formData, setFromData] = useState({
    subject: "",
    message: "",
  });

  const handleFormChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setFromData({ ...formData, [name]: value });
  };

  const sendFeedback = async (e, data) => {
    try {
      e.preventDefault();
      const authToken = import.meta.env.VITE_APP_AUTH_TOKEN;
      if (!data.subject || data.subject.length < 4) {
        toast({
          title: "Please use a valid Subject",
          duration: 2000,
          status: "warning",
          isClosable: true,
          position: "top",
        });
        return;
      }
      if (!data.message || data.message.length < 4) {
        toast({
          title: "Please use a valid Message",
          duration: 2000,
          status: "warning",
          isClosable: true,
          position: "top",
        });
        return;
      }
      setTempLoading(true);
      const formResponse = await axios.post(
        `https://backend.wisechamps.com/student/feedback`,
        {
          name: user.studentName,
          email: user.email,
          grade: user.grade,
          subject: data.subject,
          message: data.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (formResponse.data.status === 200) {
        setFromData({
          subject: "",
          message: "",
        });
        toast({
          title: "Message Sent Successfully",
          duration: 1000,
          status: "success",
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Something Went Wrong",
          duration: 1000,
          status: "error",
          isClosable: true,
          position: "top",
        });
      }
      setTempLoading(false);
      return;
    } catch (error) {
      setTempLoading(false);
      setFromData({
        subject: "",
        message: "",
      });
      toast({
        title: "Something Went Wrong",
        duration: 1000,
        status: "error",
        isClosable: true,
        position: "top",
      });
      console.log("Error is :", error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useDynamicStatusBarColor("#E7E6FF");

  return (
    <Box>
      <Box
        bg={"#E7E6FF"}
        padding={[
          "3rem 0.7rem 3rem",
          "3rem 0.7rem 3rem",
          "5rem 1.5rem 3rem",
          "5rem 1.5rem 3rem",
        ]}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Text
              fontWeight={700}
              display={"flex"}
              alignItems={"center"}
              gap={"5px"}
              fontSize={["30px", "30px", "35px", "40px"]}
            >
              Contact Us
            </Text>
            <Text mt={"10px"} fontSize={["13px", "14px", "15px", "16px"]}>
              If you have any urgent questions, give us a call at +91 8527074411
            </Text>
            <Box mt={"15px"}>
              <Button
                id="submit-btn"
                width={"unset !important"}
                fontSize={["13px", "14px", "15px", "16px"]}
                onClick={() => window.open("tel:+918527074411")}
              >
                <RiPhoneFill fontSize={"25px"} style={{ marginRight: "5px" }} />{" "}
                Call Now
              </Button>
              <Button
                ml={"15px"}
                fontSize={["13px", "14px", "15px", "16px"]}
                onClick={() => window.open("https://wa.me/919717094422")}
                color={"#22A555"}
                bg={"white"}
                _focus={{
                  bg: "#fafafa",
                }}
                _hover={{
                  bg: "#fafafa",
                }}
              >
                <RiWhatsappFill
                  fontSize={"25px"}
                  style={{ marginRight: "5px" }}
                />{" "}
                Whatsapp Now
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        padding={["1rem 0.7rem 3rem", "1rem 0.7rem 3rem", "1.5rem", "1.5rem"]}
        display={"flex"}
        justifyContent={["center", "center", "flex-end", "flex-end"]}
        alignItems={"center"}
        minHeight={["auto", "auto", "50vh", "60vh"]}
        gap={20}
        position={"relative"}
        maxWidth={"1200px"}
        margin={"0 auto"}
      >
        <Image
          position={"absolute"}
          left={0}
          top={0}
          src={contact_us}
          alt=""
          width={"100%"}
          maxWidth={["0", "0", "450px", "500px", "580px"]}
          display={["none", "none", "block", "block"]}
        />
        <form
          className="input-container"
          style={{ zIndex: 9, position: "relative", background: "white" }}
        >
          <Text
            fontSize={["18px", "18px", "22px", "22px"]}
            fontWeight={600}
            mb={"1.2rem"}
          >
            Send Your Query / Feedback
          </Text>
          <Box
            display={"flex"}
            alignItems={"flex-end"}
            flexDirection={"column"}
            gap={"1.2rem"}
          >
            <InputGroup>
              <input
                type="text"
                inputMode="text"
                onChange={handleFormChange}
                className="input-field"
                name="subject"
                id="subject"
                required
                placeholder="Subject"
                value={formData.subject}
              />
              <label htmlFor="subject" className="input-label">
                Subject
              </label>
              <Text as={"span"} className="input-highlight"></Text>
            </InputGroup>
            <InputGroup>
              <textarea
                inputMode="text"
                onChange={handleFormChange}
                className="input-field"
                name="message"
                id="message"
                required
                placeholder="Enter Your Message"
                value={formData.message}
                style={{
                  minHeight: "80px",
                }}
              />
              <label htmlFor="message" className="input-label">
                Enter your Message
              </label>
              <Text as={"span"} className="input-highlight"></Text>
            </InputGroup>
            <Button
              type="submit"
              width={["100%", "100%", "auto !important", "auto !important"]}
              id="submit-btn"
              border="none"
              cursor="pointer"
              onClick={(e) => sendFeedback(e, formData)}
              isLoading={tempLoading}
              loadingText="Loading..."
              margin={"0 !important"}
            >
              <Text
                fontWeight={600}
                fontSize={["13px", "13px", "14px", "15px"]}
              >
                Submit
              </Text>
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
