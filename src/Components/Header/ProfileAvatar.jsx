import {
  Avatar,
  ChakraProvider,
  Heading,
  Image,
  useToast,
} from "@chakra-ui/react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Input,
  List,
  ListItemButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import hi from "/src/assets/hi.gif";
import { UserSystemStatics } from "../MoreActions/UserSystemStatics";
import { RiCloseLine } from "react-icons/ri";
import { ListItemContent } from "@mui/joy";
import Compressor from "compressorjs";
import {
  setAlert,
  setMode,
  setOqad,
  setOrders,
  setPaymentHistory,
  setReport,
  setTestSeriesData,
  setTestSeriesDoubtSession,
  setUrlQuery,
  setUser,
  setWinners,
} from "../../Redux/action";
import { Link } from "react-router-dom";
export const ProfileAvatar = () => {
  const studentName = useSelector((state) => state.user.studentName);
  const address = useSelector((state) => state.user.address);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(
    localStorage.getItem("wise_profile_pic")
      ? JSON.parse(localStorage.getItem("wise_profile_pic"))
      : null
  );
  const [imageUpdated, setImageUpdated] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const toggleDrawer = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(inOpen);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(e.target.files[0]));
    new Compressor(file, {
      quality: 0.6,
      success: (res) => {
        getBase64(res).then((base64) => {
          localStorage.setItem("wise_profile_pic", JSON.stringify(base64));
        });
        setImageUpdated(true);
      },
    });
  };

  const handleUserLogout = async () => {
    localStorage.removeItem("wise_email");
    localStorage.removeItem("wise_pass");
    dispatch(
      setUser({
        email: "",
        phone: "",
        name: "",
        credits: 0,
        coins: 0,
        grade: 0,
        id: "",
        studentName: "",
        address: null,
        referrals: [],
        quizzes: [],
        age: 0,
        category: "",
        coinsHistory: [],
        weeklyQuizzes: [],
        newUser: false,
        difficulty: false,
      })
    );
    dispatch(
      setOrders({
        status: 0,
        data: [],
      })
    );
    dispatch(setAlert([]));
    dispatch(setReport({}));
    dispatch(setWinners({}));
    dispatch(
      setPaymentHistory({
        status: 0,
        data: [],
      })
    );
    dispatch(setOqad({}));
    dispatch(setUrlQuery(""));
    dispatch(
      setTestSeriesData({
        status: 0,
        data: [],
      })
    );
    dispatch(
      setTestSeriesDoubtSession({
        status: 0,
        data: [],
      })
    );
    dispatch(setMode(""));
  };

  useEffect(() => {
    if (imageUpdated) {
      toast({
        title: `Profile Pic Updated`,
        status: "success",
        isClosable: true,
        position: "top",
        duration: 1000,
      });
      setImageUpdated(false);
    }
  }, [imageUpdated]);

  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        top: { xs: "10px", md: "17px" },
        right: { xs: "10px", md: "1.5rem" },
        zIndex: 999,
      }}
    >
      <ChakraProvider disableGlobalStyle>
        <Avatar
          size={"md"}
          maxWidth={"40px"}
          maxHeight={"40px"}
          name={studentName}
          src={image}
          bg="#5838fc"
          onClick={toggleDrawer(true)}
          style={{ cursor: "pointer" }}
        />
      </ChakraProvider>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        className="profile-drawer-cointainer"
      >
        <Box
          role="presentation"
          className="profile-drawer"
          sx={{
            maxWidth: { xs: "280px", sm: "350px", md: "auto" },
          }}
          position={"relative"}
        >
          <Box display={"flex"} gap={"5px"}>
            <RiCloseLine
              onClick={toggleDrawer(false)}
              style={{
                fontSize: "30px",
                position: "absolute",
                top: "15px",
                right: "15px",
                cursor: "pointer",
              }}
            />
            <Heading
              fontSize={["20px", "20px", "25px", "25px", "25px"]}
              fontWeight={400}
              textTransform={"capitalize"}
            >
              Hi,{" "}
              {studentName ? studentName.toString().split(" ")[0] : "Student"}
            </Heading>
            <Image
              position={"relative"}
              bottom={["2px", "2px", "0", "0"]}
              src={hi}
              alt="👋"
              width={"30px"}
              height={"30px"}
            />
          </Box>
          <UserSystemStatics />

          <Divider sx={{ marginTop: "20px" }} />
          <List>
            <ListItemContent sx={{ padding: 0 }} className="profile-options">
              <ListItemButton
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                Update Profile Pic
                <Input
                  type="file"
                  onChange={handlePhotoChange}
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    opacity: "0",
                    zIndex: 9,
                  }}
                />
              </ListItemButton>
            </ListItemContent>
          </List>

          <Divider />
          <List sx={{ marginTop: "10px" }}>
            <ListItemContent sx={{ padding: 0 }} className="profile-options">
              <Button
                id="submit-btn"
                sx={{
                  padding: "0px !important",
                }}
              >
                <Link
                  style={{
                    width: "100%",
                    padding: "7px",
                  }}
                  to={"/winners"}
                >
                  Weekly Winners
                </Link>
              </Button>
            </ListItemContent>
            <ListItemContent sx={{ padding: 0 }} className="profile-options">
              <Button
                id="submit-btn"
                sx={{
                  padding: "0px !important",
                  mt: "10px",
                }}
              >
                <Link
                  style={{
                    width: "100%",
                    padding: "7px",
                  }}
                  to={"/orders"}
                >
                  My Orders
                </Link>
              </Button>
            </ListItemContent>

            <ListItemContent sx={{ padding: 0 }} className="profile-options">
              <Button
                id="submit-btn"
                sx={{
                  padding: "0px !important",
                  mt: "10px",
                }}
              >
                <Link
                  style={{
                    width: "100%",
                    padding: "7px",
                  }}
                  to={"/address"}
                >
                  {!address ? "Add Address" : "Update Address"}
                </Link>
              </Button>
            </ListItemContent>
            <ListItemContent
              sx={{ padding: 0, mt: "10px" }}
              className="profile-options"
            >
              <Button
                id="submit-btn"
                sx={{
                  padding: "7px !important",
                }}
                onClick={() => handleUserLogout()}
              >
                Logout
              </Button>
            </ListItemContent>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};
