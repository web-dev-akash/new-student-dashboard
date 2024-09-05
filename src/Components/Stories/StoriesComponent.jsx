import { Box, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import Stories from "react-insta-stories";

export const StoriesComponent = ({ setShowStory, showStory }) => {
  const handleButtonClick = () => {
    alert("Testing Success");
  };

  const stories = [
    {
      content: ({ action, isPaused }) => {
        return (
          <Box
            width={"100%"}
            height={"100%"}
            background={"pink"}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <h1>🌝</h1>
            <h1>{isPaused ? "Paused" : "Playing"}</h1>
            <Button onClick={handleButtonClick}>Testing</Button>
          </Box>
        );
      },
    },
    {
      content: ({ action, isPaused }) => {
        return (
          <Box
            width={"100%"}
            height={"100%"}
            background={"pink"}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <h1>🌝</h1>
            <h1>{isPaused ? "Paused" : "Playing"}</h1>
            <Button onClick={handleButtonClick}>Testing</Button>
          </Box>
        );
      },
    },
    {
      content: ({ action, isPaused }) => {
        return (
          <Box
            width={"100%"}
            height={"100%"}
            background={"pink"}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <h1>🌝</h1>
            <h1>{isPaused ? "Paused" : "Playing"}</h1>
            <Button onClick={handleButtonClick}>Testing</Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      position={"absolute"}
      zIndex={1110}
      top={0}
      left={0}
      height={"100vh"}
      width={"100vw"}
      overflow={"hidden"}
    >
      <Stories
        currentIndex={showStory ? 0 : 0}
        stories={stories}
        defaultInterval={3000}
        width={"100%"}
        height={"100%"}
        onAllStoriesEnd={() => setShowStory(false)}
      />
    </Box>
  );
};
