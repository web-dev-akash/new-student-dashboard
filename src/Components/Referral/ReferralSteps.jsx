import {
  Box,
  Image,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import success from "/src/assets/success.png";
import inactive from "/src/assets/active.png";
import waiting from "/src/assets/waiting.png";

// eslint-disable-next-line react/prop-types
export const ReferralSteps = ({ quizAttempted }) => {
  const steps = [
    {
      title:
        quizAttempted > 0 ? "First Quiz Attempted" : "First Quiz Not Attempted",
      description:
        quizAttempted > 0
          ? `Congratulations! You won 300 coins`
          : "Not eligible for the 300 coins",
    },
    {
      title:
        quizAttempted >= 8 ? "8 Quizzes Attempted" : "8 Quizzes Not Attempted",
      description:
        quizAttempted >= 8
          ? `Congratulations! You won 3000 coins`
          : "Not eligible for 3000 coins",
    },
  ];
  const { activeStep } = useSteps({
    index:
      quizAttempted > 0 && quizAttempted < 8 ? 1 : quizAttempted >= 8 ? 2 : 0,
    count: steps.length,
  });
  return (
    <Stepper
      mt={3}
      size={"sm"}
      index={activeStep}
      gap={0}
      orientation={"vertical"}
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<Image src={success} alt="✅" />}
              incomplete={<Image src={inactive} alt="✅" />}
              active={<Image src={waiting} alt="✅" />}
            />
          </StepIndicator>
          <Box>
            <StepTitle fontSize={["12px", "12px", "13px", "13px"]}>
              {step.title}
            </StepTitle>
            <StepDescription
              fontSize={["11px", "11px", "13px", "13px"]}
              style={{ marginBottom: "25px" }}
            >
              {step.description}
            </StepDescription>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};
