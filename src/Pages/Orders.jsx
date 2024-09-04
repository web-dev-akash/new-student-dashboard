import { Box, ChakraProvider, Image, Tag, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../Redux/action";
import preview from "../assets/preview.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaGifts } from "react-icons/fa";

export const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.data);
  const orderStatus = useSelector((state) => state.orders.status);
  const { id } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (orderStatus === 0 || orderStatus >= 400) {
      dispatch(getOrders(id));
    }
  }, []);

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
              src="/images/logo.png"
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
        <Box
          bg={"#E7E6FF"}
          padding={[
            "2.5rem 0.7rem 5rem",
            "2.5rem 0.7rem 5rem",
            "3.5rem 1.5rem 5rem",
            "3.5rem 1.5rem 5rem",
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
                <Text
                  fontWeight={500}
                  fontSize={["15px", "15px", "17px", "17px"]}
                >
                  My Orders
                </Text>
                <Text
                  fontWeight={700}
                  display={"flex"}
                  alignItems={"center"}
                  gap={"5px"}
                  fontSize={["30px", "30px", "35px", "40px"]}
                >
                  {orders.length}
                  <FaGifts />
                </Text>
              </Box>
            </Box>
          </Box>
          {orders.length > 0 ? (
            <Box>
              {orders.map(
                ({
                  Order_Status,
                  Expected_Delivery_Date,
                  Product_Name,
                  Order_Id,
                  Product_Image_URL,
                  Order_Date,
                }) => (
                  <Box
                    key={Order_Id}
                    display={"flex"}
                    alignItems={"center"}
                    gap={3}
                    bg={"#fff"}
                    padding={"10px"}
                    borderRadius={"10px"}
                    mt={"10px"}
                  >
                    <Image
                      src={Product_Image_URL || preview}
                      alt=""
                      width={"65px"}
                      borderRadius={"5px"}
                      height={"65px"}
                      objectFit={"cover"}
                    />
                    <Box width={"100%"}>
                      <Box
                        width={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        mb={"2px"}
                      >
                        <Text
                          fontWeight={600}
                          fontSize={["13px", "sm", "sm", "md"]}
                        >
                          {Order_Status === "Placed"
                            ? `Order Confirmed`
                            : Order_Status === "Processed"
                            ? `Order Shipped`
                            : Order_Status === "Delivered"
                            ? `Order Delivered`
                            : Order_Status === "Cancelled"
                            ? "Order Cancelled"
                            : "Order in Process"}
                        </Text>
                        <Text>
                          <Tag
                            fontSize={["10px", "11px", "12px", "13px"]}
                            size={["sm", "sm", "sm", "md"]}
                            colorScheme={
                              Order_Status === "Placed"
                                ? `purple`
                                : Order_Status === "Processed"
                                ? `whatsapp`
                                : Order_Status === "Delivered"
                                ? `whatsapp`
                                : Order_Status === "Cancelled"
                                ? "red"
                                : "purple"
                            }
                          >
                            {new Date(Order_Date).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </Tag>
                        </Text>
                      </Box>
                      <Text
                        isTruncated
                        fontSize={["xs", "xs", "sm", "md"]}
                        maxWidth={[
                          "230px",
                          "400px",
                          "600px",
                          "850px",
                          "1200px",
                        ]}
                        color={"#727272"}
                      >
                        {Product_Name}
                      </Text>
                      {Order_Status === "Placed" ? (
                        <Text
                          pt={"4px"}
                          fontSize={["11px", "12px", "13px", "14px"]}
                          maxWidth={["200px", "400px", "600px", "900px"]}
                        >
                          Expected delivery date upon shipment
                        </Text>
                      ) : Order_Status === "Processed" ? (
                        <Text
                          pt={"5px"}
                          fontSize={["11px", "12px", "13px", "14px"]}
                          maxWidth={["200px", "400px", "600px", "900px"]}
                        >
                          Expected Delivery by{" "}
                          {new Date(Expected_Delivery_Date).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </Text>
                      ) : Order_Status === "Delivered" ? (
                        <Text
                          pt={"5px"}
                          fontSize={["11px", "12px", "13px", "14px"]}
                          maxWidth={["200px", "400px", "600px", "900px"]}
                        >
                          Order Delivered on{" "}
                          {new Date(Expected_Delivery_Date).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </Text>
                      ) : Order_Status === "Cancelled" ? (
                        <Text
                          pt={"5px"}
                          fontSize={["11px", "12px", "13px", "14px"]}
                          maxWidth={["200px", "400px", "600px", "900px"]}
                        >
                          Order Cancelled on{" "}
                          {new Date(Expected_Delivery_Date).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </Text>
                      ) : null}
                    </Box>
                  </Box>
                )
              )}
            </Box>
          ) : (
            <Box
              display={"flex"}
              alignItems={"center"}
              textAlign={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
              height={"50vh"}
              width={"90%"}
              margin={"0 auto"}
            >
              <Text
                lineHeight={"1.2"}
                fontSize={["45px", "50px", "55px", "60px"]}
                fontWeight={800}
                color={"#929292"}
              >
                No Orders Found
              </Text>
            </Box>
          )}
        </Box>
      </ChakraProvider>
    </>
  );
};
