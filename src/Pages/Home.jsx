import { Box } from "@mui/material";
import { Header } from "../Components/Header/Header";
import { NavigationTabs } from "../Components/NavBar/NavigationTabs";
import "../styles/NavigationTabs.modal.css";
import "../styles/ProfileAvatar.modal.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getDailyQuestion,
  getStoriesData,
  getTestSeriesByGrade,
  getTestSeriesDoubtSessions,
  updatePushTokenToZoho,
} from "../Redux/action";
import { messaging, requestForToken } from "../firebase";
import { onMessage } from "firebase/messaging";
import { Button, Text, useToast } from "@chakra-ui/react";

export const Home = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state) => state.user);
  const oqad = useSelector((state) => state.oqad);
  const testSeries = useSelector((state) => state.testSeries);
  const currentStories = useSelector((state) => state.story);
  const testSeriesDoubtSession = useSelector((state) => state.doubtSession);
  const tokenLocal = localStorage.getItem("FCM_TOKEN") || null;

  const getToken = () => {
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        if (!tokenLocal) {
          navigator.serviceWorker.ready.then((registration) => {
            requestForToken(registration).then((token) => {
              if (token) {
                localStorage.setItem("FCM_TOKEN", token);
                updatePushTokenToZoho(user.email, token).then((res) => {
                  console.log("Updated in DB", res);
                });
              } else {
                console.log("Error Generating Token");
              }
            });
          });
        }
      }
    });
  };

  onMessage(messaging, (payload) => {
    console.log("Foreground Notification", payload);
    toast({
      title: payload.data.title,
      description: (
        <Box>
          <Text mb={1.5}>{payload.data.body}</Text>
          <Button
            onClick={() => {
              window.open(payload.data.url);
            }}
          >
            Join Now
          </Button>
        </Box>
      ),
      position: "top",
      duration: 5000,
      isClosable: true,
      status: "success",
    });
  });

  useEffect(() => {
    if (!oqad || !oqad.status) {
      dispatch(getDailyQuestion(user.grade, user.id));
    }

    if (testSeries.status === 0) {
      dispatch(getTestSeriesByGrade(user.grade));
    }

    if (testSeriesDoubtSession.status === 0) {
      dispatch(getTestSeriesDoubtSessions(user.grade));
    }

    if (currentStories.status === 0) {
      dispatch(getStoriesData(user.grade));
    }

    getToken();
  }, []);

  return (
    <Box>
      <Header />
      <NavigationTabs />
    </Box>
  );
};
