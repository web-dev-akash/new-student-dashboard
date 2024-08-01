import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Code,
  Divider,
  Image,
  SimpleGrid,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { GiTwoCoins } from "react-icons/gi";
import preview from "../assets/preview.jpg";
import { getError, getLoading } from "../Redux/action";
import axios from "axios";
import order_placed from "../assets/order_placed.gif";
import { Loading } from "../Components/Loading/Loading";
import { CgArrowBottomLeftR, CgArrowTopRightR } from "react-icons/cg";
import { ClickBtn } from "../Components/ClickBtn/ClickBtn";

export const Store = () => {
  const dispatch = useDispatch();
  const [tempMode, setTempMode] = useState("");
  const products = useSelector((state) => state.products);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);
  const { coins, id } = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [showDescription, setShowDescription] = useState(null);
  const [productId, setProductId] = useState(null);
  const coinsHistory = useSelector((state) => state.user.coinsHistory);

  const handleProductPurchase = async (body) => {
    try {
      dispatch(getLoading());
      const authToken = import.meta.env.VITE_APP_AUTH_TOKEN;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };
      const url = `https://backend.wisechamps.com/student/store/placeOrder`;
      const res = await axios.post(url, body, config);
      if (res.data.status === 201) {
        setTempMode("thankyou");
      } else {
        dispatch(getError());
      }
    } catch (error) {
      dispatch(getError());
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (tempMode === "thankyou") {
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
  }, [tempMode]);

  if (tempMode === "thankyou") {
    return (
      <>
        <Box
          height={["80vh", "80vh", "90vh", "100vh"]}
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={2}
          textAlign={"center"}
        >
          <Box
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Image
              width={"55px"}
              height={"45px"}
              objectFit={"cover"}
              src={order_placed}
              alt="✅"
            />
            <Text
              fontSize={["22px", "22px", "25px", "30px"]}
              fontWeight={600}
              mr={"35px"}
            >
              Order Placed{" "}
            </Text>
          </Box>
          <Text
            maxWidth={"400px"}
            width={"90%"}
            margin={"0 auto"}
            fontSize={["13px", "13px", "14px", "15px"]}
          >
            Your order has been placed successfully. You can view the details of
            your order in the Orders Page.
          </Text>
          <Button
            id="submit-btn"
            style={{ width: "160px" }}
            fontSize={["13px", "13px", "14px", "15px"]}
            mt={"5px"}
            onClick={() => window.location.reload()}
          >
            Go back to store
          </Button>
        </Box>
      </>
    );
  }

  if (loading || products?.length === 0) {
    return <Loading />;
  }

  if (error) {
    return <Navigate to={"/error"} />;
  }

  // if (products?.length === 0) {
  //   return (
  //     <Box
  //       height={["95vh", "95vh", "95vh", "98vh"]}
  //       display={"flex"}
  //       justifyContent={"center"}
  //       alignItems={"center"}
  //       textAlign={"center"}
  //     >
  //       <Text>
  //         <Text mb={4}>The Reward Store will be available soon..</Text>
  //         <Link style={{ fontSize: "13px" }} to={"/dashboard"} id="submit-btn">
  //           Try Again
  //         </Link>
  //       </Text>
  //     </Box>
  //   );
  // }

  return (
    <Box
      bg={"#E7E6FF"}
      padding={[
        "2.5rem 0.7rem 6rem",
        "2.5rem 0.7rem 6rem",
        "5rem 1.5rem 1.5rem",
        "5rem 1.5rem 1.5rem",
      ]}
    >
      <Box mt={"15px"}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Text fontWeight={500} fontSize={["14px", "14px", "16px", "16px"]}>
              Available Coin Balance
            </Text>
            <Text
              fontWeight={700}
              display={"flex"}
              alignItems={"center"}
              gap={"5px"}
              fontSize={["30px", "30px", "35px", "40px"]}
              m={"0px 0 8px 0"}
            >
              {coins}{" "}
              <GiTwoCoins
                color={"gold"}
                style={{
                  filter: "drop-shadow(0 0 0.8px rgba(0, 0, 0, 0.8))",
                }}
              />
            </Text>
          </Box>
          <Box position={"relative"}>
            <Button
              fontSize={["12px", "12px", "13px", "14px"]}
              padding={"0 !important"}
              bg={"white"}
              border={"1px solid #5838fc"}
              color={"#5838fc"}
            >
              <Link
                style={{
                  width: "100%",
                  padding: "10px 20px",
                }}
                to={"/orders"}
              >
                My Orders
              </Link>
            </Button>
            <ClickBtn style={{ top: 8 }} />
          </Box>
        </Box>

        <Accordion allowToggle mb={"10px"}>
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
                  My Coins Transaction History
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel p={0}>
              <Box bg={"white"} padding={"0px 10px"} id="transactions">
                {coinsHistory.length === 0 && (
                  <Box
                    minHeight={"80px"}
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
                      No Transactions Found
                    </Text>
                  </Box>
                )}
                {coinsHistory.map(
                  ({ Coins, Updated_Date, id, Action_Type, Description }) => (
                    <Box
                      key={id}
                      bg={"white"}
                      padding={"10px 0"}
                      borderBottom={"1px solid #e0e0e0"}
                    >
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Box display={"flex"} alignItems={"center"} gap={"5px"}>
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
                            {Action_Type === "Credit" ? (
                              <CgArrowBottomLeftR />
                            ) : (
                              <CgArrowTopRightR />
                            )}
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
                              {Description}
                            </Text>
                            <Text fontSize={["11px", "11px", "12px", "13px"]}>
                              {Action_Type === "Credit"
                                ? `Coins Added`
                                : `Coins Deducted`}
                            </Text>
                          </Box>
                        </Box>
                        <Box
                          display={"flex"}
                          alignItems={"flex-end"}
                          justifyContent={"center"}
                          flexDirection={"column"}
                        >
                          <Text
                            display={"flex"}
                            gap={"2px"}
                            alignItems={"center"}
                            fontSize={["13px", "12px", "15px", "15px"]}
                            fontWeight={600}
                          >
                            <Text
                              color={
                                Action_Type === "Credit" ? "#12ca21" : "#da1f2f"
                              }
                            >
                              {Action_Type === "Credit"
                                ? `+${Coins}`
                                : `-${Coins}`}
                            </Text>
                            <GiTwoCoins
                              color={
                                Action_Type === "Credit" ? "#12ca21" : "#da1f2f"
                              }
                            />
                          </Text>
                          <Text
                            fontSize={["09px", "10px", "12px", "12px"]}
                            fontWeight={500}
                          >
                            {new Date(Updated_Date).toLocaleDateString("en", {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                            })}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Accordion allowToggle mb={"25px"}>
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
                  How to earn more coins ?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel p={0}>
              <TableContainer whiteSpace={"none"} maxWidth={"100%"}>
                <Table
                  id="howToEarnCoins"
                  variant="striped"
                  bg={"purple.100"}
                  fontSize={["11px", "11px", "13px", "14px"]}
                  fontWeight={[500, 500, 450, 450]}
                >
                  <TableCaption padding={"10px 0"} m={0} bg={"white"}>
                    <Code
                      fontSize={["13px", "13px", "14px", "15px"]}
                      colorScheme="red"
                      fontWeight={600}
                    >
                      Note : 10 Coins = ₹1
                    </Code>
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Td>
                        <Text
                          textTransform={"uppercase"}
                          color={"#000"}
                          fontWeight={700}
                        >
                          Criteria
                        </Text>
                      </Td>
                      <Td>
                        <Text
                          textTransform={"uppercase"}
                          color={"#000"}
                          fontWeight={700}
                        >
                          Coins
                        </Text>
                      </Td>
                    </Tr>
                  </Thead>
                  <Tbody style={{ color: "#575757" }}>
                    <Tr>
                      <Td>Lucky draw winner every day</Td>
                      <Td>
                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          gap={"5px"}
                        >
                          100{" "}
                          <GiTwoCoins
                            color={"gold"}
                            style={{
                              filter:
                                "drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.9))",
                            }}
                          />
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Complete 10 or more quizzes in a month</Td>
                      <Td>
                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          gap={"5px"}
                        >
                          300{" "}
                          <GiTwoCoins
                            color={"gold"}
                            style={{
                              filter:
                                "drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.9))",
                            }}
                          />
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Top 3 highest scorers weekly</Td>
                      <Td>
                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          gap={"5px"}
                        >
                          300{" "}
                          <GiTwoCoins
                            color={"gold"}
                            style={{
                              filter:
                                "drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.9))",
                            }}
                          />
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        Top 3 highest percentage weekly{" "}
                        <Text
                          as={"span"}
                          fontSize={["9px", "9px", "13px", "14px"]}
                        >
                          (Total Score / Total Questions Attempted)
                        </Text>
                      </Td>
                      <Td>
                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          gap={"5px"}
                        >
                          300{" "}
                          <GiTwoCoins
                            color={"gold"}
                            style={{
                              filter:
                                "drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.9))",
                            }}
                          />
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Complete first 50 quizzes</Td>
                      <Td>
                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          gap={"5px"}
                        >
                          1000{" "}
                          <GiTwoCoins
                            color={"gold"}
                            style={{
                              filter:
                                "drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.9))",
                            }}
                          />
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Complete first 100 quizzes</Td>
                      <Td>
                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          gap={"5px"}
                        >
                          1500{" "}
                          <GiTwoCoins
                            color={"gold"}
                            style={{
                              filter:
                                "drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.9))",
                            }}
                          />
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Complete first 200 quizzes</Td>
                      <Td>
                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          gap={"5px"}
                        >
                          2000{" "}
                          <GiTwoCoins
                            color={"gold"}
                            style={{
                              filter:
                                "drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.9))",
                            }}
                          />
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Referral takes the 1st quiz</Td>
                      <Td>
                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          gap={"5px"}
                        >
                          300{" "}
                          <GiTwoCoins
                            color={"gold"}
                            style={{
                              filter:
                                "drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.9))",
                            }}
                          />
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Referral takes first 8 quizzes</Td>
                      <Td>
                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          gap={"5px"}
                        >
                          3000{" "}
                          <GiTwoCoins
                            color={"gold"}
                            style={{
                              filter:
                                "drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.9))",
                            }}
                          />
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        5 Referrals take first 8 quizzes each ( Get Additional
                        Coins )
                      </Td>
                      <Td>
                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          gap={"5px"}
                        >
                          5000{" "}
                          <GiTwoCoins
                            color={"gold"}
                            style={{
                              filter:
                                "drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.9))",
                            }}
                          />
                        </Text>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <SimpleGrid
        mt={"15px"}
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(310px, 1fr))"
      >
        {products.map(
          ({
            Description,
            Product_Name,
            Product_Id,
            Product_Image_URL,
            Unit_Price,
          }) => (
            <Card
              key={Product_Id}
              boxShadow={
                "rgb(204, 219, 232) 0px 0px 6px 1px, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px"
              }
            >
              <CardBody pb={0}>
                <Box
                  borderRadius={"lg"}
                  height={"300px"}
                  width={"100%"}
                  overflow={"hidden"}
                  border={"1px solid #cfcfcf80"}
                >
                  <Image
                    src={Product_Image_URL || preview}
                    alt="Product Image"
                    borderRadius="lg"
                    height={"100%"}
                    width={"100%"}
                    objectFit={"cover"}
                  />
                </Box>
                <Stack mt="6" spacing="3">
                  <Text
                    fontWeight={600}
                    fontSize={["14px", "14px", "16px", "16px"]}
                    noOfLines={showDescription === Product_Id ? 99 : 2}
                    onClick={() =>
                      setShowDescription(
                        showDescription === Product_Id ? "" : Product_Id
                      )
                    }
                  >
                    {Product_Name}
                  </Text>
                  <Text
                    noOfLines={showDescription === Product_Id ? 99 : 4}
                    onClick={() =>
                      setShowDescription(
                        showDescription === Product_Id ? "" : Product_Id
                      )
                    }
                    fontSize={["12px", "13px", "13px", "13px"]}
                  >
                    {Description}
                  </Text>
                </Stack>
              </CardBody>
              <Box ml={"20px"} p={"10px 0"}>
                <Text
                  color={"#4e46e4"}
                  fontSize="30px"
                  fontWeight={700}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                >
                  {Unit_Price}{" "}
                  <GiTwoCoins
                    color={"gold"}
                    style={{
                      filter: "drop-shadow(0 0 0.8px rgba(0, 0, 0, 0.8))",
                    }}
                  />
                </Text>
              </Box>
              <Divider />
              <CardFooter>
                <Text
                  width={"100%"}
                  height={"100%"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  onClick={() => setProductId(Product_Id)}
                >
                  <Button
                    id={coins < Unit_Price ? "submit-btn-active" : "submit-btn"}
                    isLoading={coins < Unit_Price ? true : false}
                    loadingText="Insufficient Coins"
                    spinnerPlacement="none"
                    fontSize={["13px", "13px", "14px", "15px"]}
                    onClick={onOpen}
                  >
                    Buy Now
                  </Button>
                </Text>
                <AlertDialog
                  id="alertDialogBoxMainDiv"
                  motionPreset="slideInBottom"
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                  isOpen={isOpen && productId === Product_Id}
                  closeOnOverlayClick
                  isCentered
                >
                  <AlertDialogOverlay
                    background={"transparent"}
                    backdropFilter={"blur(5px)"}
                  />
                  <AlertDialogContent>
                    <AlertDialogHeader
                      fontSize={["18px", "18px", "20px", "22px"]}
                    >
                      Confirm Your Order
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody
                      pt={0}
                      fontSize={["14px", "15px", "16px", "18px"]}
                    >
                      This product costs {Unit_Price} coins. If you want to
                      continue placing order, then select YES.
                    </AlertDialogBody>
                    <AlertDialogFooter
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Button
                        width={"100%"}
                        colorScheme="gray"
                        ref={cancelRef}
                        onClick={onClose}
                      >
                        No
                      </Button>
                      <Button
                        width={"100%"}
                        color={"white"}
                        bg={"#4e46e4"}
                        ml={3}
                        onClick={() =>
                          handleProductPurchase({
                            contactId: id,
                            productId: Product_Id,
                          })
                        }
                      >
                        Yes
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          )
        )}
      </SimpleGrid>
    </Box>
  );
};
