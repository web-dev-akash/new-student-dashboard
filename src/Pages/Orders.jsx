import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Stack,
  StackDivider,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../Redux/action";
import preview from "../assets/preview.jpg";
import { Link } from "react-router-dom";

export const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const { id } = useSelector((state) => state.user);

  useEffect(() => {
    if (orders?.length === 0) {
      dispatch(getOrders(id));
    }
    localStorage.setItem("wisechamps_current_path", window.location.pathname);
  }, []);

  return (
    <Box p={"3.5rem 11px 1rem 11px"}>
      {orders.length > 0 ? (
        <Card
          boxShadow={
            "rgb(204, 219, 250) 0px 0px 10px 2px, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px"
          }
        >
          <CardHeader>
            <Heading size={["md", "md", "md", "lg"]}>
              <Text>My Orders</Text>
            </Heading>
          </CardHeader>
          <CardBody pt={"0"}>
            <Stack divider={<StackDivider />} spacing="4">
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
                        // border={"1px solid"}
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
                            colorScheme="purple"
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
                        maxWidth={["200px", "400px", "600px", "900px"]}
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
            </Stack>
          </CardBody>
        </Card>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          textAlign={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          height={["70vh", "70vh", "80vh", "80vh"]}
          width={"90%"}
          margin={"0 auto"}
        >
          <Text
            lineHeight={"1.2"}
            fontSize={["45px", "50px", "55px", "60px"]}
            fontWeight={700}
            color={"#929292"}
          >
            No Orders Found
          </Text>
          <Button
            id="submit-btn"
            style={{ width: "160px" }}
            fontSize={["13px", "13px", "14px", "15px"]}
            mt={"15px"}
          >
            <Link to={"/dashboard/store"}>Go to Gift Store</Link>
          </Button>
        </Box>
      )}
    </Box>
  );
};
