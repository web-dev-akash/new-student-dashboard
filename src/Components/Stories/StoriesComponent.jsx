/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { WithSeeMore } from "react-insta-stories";
import { useDispatch, useSelector } from "react-redux";
import { ripples } from "ldrs";
import { getStoriesData } from "../../Redux/action";
const StoriesLazy = React.lazy(() => import("react-insta-stories"));

ripples.register();

export const StoriesComponent = ({ setShowStory }) => {
  const currentStories = useSelector((state) => state.story);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const stories = [
    {
      url: `https://picsum.photos/${viewportWidth}/${viewportHeight}`,
      seeMoreCollapsed: ({ toggleMore, action }) => (
        <p style={customSeeMore} onClick={() => toggleMore(true)}>
          A custom See More message →
        </p>
      ),
      seeMore: ({ close }) => (
        <div
          style={{
            maxWidth: "100%",
            height: "100%",
            padding: 40,
            background: "white",
          }}
        >
          <h2>Just checking the see more feature.</h2>
          <p style={{ textDecoration: "underline" }} onClick={close}>
            Go on, close this popup.
          </p>
        </div>
      ),
    },
  ];

  const requestFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    requestFullscreen();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      position={"absolute"}
      zIndex={1110}
      top={0}
      left={0}
      width={"100vw"}
      overflow={"hidden"}
    >
      <Suspense>
        <StoriesLazy
          // loader={
          //   <Box
          //     width={"100vw"}
          //     height={"100vh"}
          //     display={"flex"}
          //     justifyContent={"center"}
          //     alignItems={"center"}
          //   >
          //     <l-ripples size="60" speed="2" color="white"></l-ripples>
          //   </Box>
          // }
          stories={stories}
          defaultInterval={8000}
          width={"100%"}
          height={"100%"}
          onAllStoriesEnd={() => {
            exitFullScreen();
            setShowStory(false);
          }}
        />
      </Suspense>
    </Box>
  );
};

const customSeeMore = {
  textAlign: "center",
  fontSize: 14,
  bottom: 20,
  position: "relative",
  color: "white",
  cursor: "pointer",
};
