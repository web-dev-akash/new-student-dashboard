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
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { GiTwoCoins } from "react-icons/gi";
import preview from "../assets/preview.jpg";
import { getError, getLoading, getOrders } from "../Redux/action";
import axios from "axios";
import order_placed from "../assets/order_placed.gif";
import { Loading } from "../Components/Loading/Loading";

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
    dispatch(getOrders(id));
    localStorage.setItem("wisechamps_current_path", window.location.pathname);
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Navigate to={"/error"} />;
  }

  if (products?.length === 0) {
    return (
      <Box
        height={["95vh", "95vh", "95vh", "98vh"]}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
      >
        <Text>
          <Text mb={4}>The Reward Store will be available soon..</Text>
          <Link style={{ fontSize: "13px" }} to={"/dashboard"} id="submit-btn">
            Try Again
          </Link>
        </Text>
      </Box>
    );
  }

  return (
    <Box padding={"1rem 11px"} bg={"#e7e6ff"}>
      <Box mt={"35px"}>
        <Box>
          <Text fontSize={["13px", "13px", "15px", "15px"]}>
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
        <Accordion allowToggle mb={"25px"}>
          <AccordionItem
            border={"1px solid #4e46e4"}
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
                  How to earn coins ?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel p={0}>
              <TableContainer whiteSpace={"none"} maxWidth={"100%"}>
                <Table
                  variant="striped"
                  bg={"purple.100"}
                  fontSize={["11px", "11px", "13px", "14px"]}
                >
                  <TableCaption padding={"10px 0"} m={0} bg={"white"}>
                    <Text fontSize={["13px", "13px", "14px", "15px"]}>
                      Note : 10 Coins = ₹1
                    </Text>
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>
                        <Text>Criteria</Text>
                      </Th>
                      <Th>
                        <Text>Coins</Text>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Lucky draw winner every day</Td>
                      <Td>
                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          gap={"5px"}
                        >
                          200{" "}
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
                      <Td>Top 5 highest scorers every week</Td>
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
                      <Td>Referral takes the first quiz</Td>
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
                  <Heading size="sm">
                    <Text
                      noOfLines={showDescription === Product_Id ? 99 : 2}
                      onClick={() =>
                        setShowDescription(
                          showDescription === Product_Id ? "" : Product_Id
                        )
                      }
                    >
                      {Product_Name}
                    </Text>
                  </Heading>
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
