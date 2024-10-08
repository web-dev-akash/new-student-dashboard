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

export const Home = () => {
  const dispatch = useDispatch();
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

  onMessage(messaging, ({ notification }) => {
    console.log("Foreground Notification", notification);
    const notify = new Notification(notification.title, {
      body: notification.body,
      icon: "/images/icon.png",
      tag: "reminder",
      requireInteraction: true,
      silent: false,
    });

    notify.onclick = (e) => {
      e.preventDefault();
      window.open(
        `https://students.wisechamps.com?email=${user.email}`,
        "_blank"
      );
    };
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
