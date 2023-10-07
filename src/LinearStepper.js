import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css";

import jsonData from "./jsonNew.json";
import CustomButton from "./ButtonComponent.js";
// import useStyles from "./LinearStepperStyles";

const backArrowSVG = (
  <svg width="25" height="13" viewBox="0 0 14 13" fill="none">
    <path
      opacity="0.85"
      d="M5.95794 11.3508L5.95794 8.00988L12.0155 8.00988L12.0155 4.97941H5.95794L5.95794 1.32818L0.683531 6.62217L5.95794 11.3508Z"
      fill="white"
    ></path>
  </svg>
);

const useStyles = makeStyles((theme) => {
  const tickPositionStyles = (tickPosition) => {
    const tickStyles = {
      position: "absolute",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: "transparent",
      border: "2px solid #fff",
      display: "block",
      boxShadow: "0 2px 4px rgba(0,0,0,.13)",
    };

    switch (tickPosition) {
      case "top-left":
        return {
          ...tickStyles,
          top: "5px",
          left: "5px",
        };
      case "top-right":
        return {
          ...tickStyles,
          top: "5px",
          right: "5px",
        };
      default:
        return tickStyles;
    }
  };

  return {
    button: {
      marginRight: theme.spacing(1),
      margin: theme.spacing(1),
    },
    btnPrevious: {
      position: "relative",
      verticalAlign: "top",
      background: "#1adf80",
      borderRadius: "84px",
      padding: "12px 40px 13px",
      marginTop: "2px",
      marginRight: "0.8rem",
      minWidth: "202px",
      color: "#fff",
      fontWeight: "700",
      fontSize: "13.5px",
      lineHeight: "1.6em",
      textAlign: "center",
      textDecoration: "none",
      textShadow: "0 0 6px rgba(0, 0, 0, 0.08)",
      boxShadow: "0 11px 20px rgba(40, 18, 197, 0.17)",
      boxSizing: "border-box",
      border: "0",
      cursor: "pointer",
      overflow: "hidden",
    },

    paper: {
      textAlign: "center",
      padding: theme.spacing(2),
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      position: "relative",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      "&:hover": {
        backgroundColor: "#e8ecff",
        "& $tick": {
          display: "block",
        },
      },
    },
    cardLabel: {
      fontSize: "18px",
      fontWeight: "bold",
      lineHeight: "4",
      marginBottom: theme.spacing(1),
    },
    selected: {
      backgroundColor: "#e8ecff",
      "& $tick": {
        backgroundColor: "blue",
      },
    },
    backButton: {
      background: "linear-gradient(162deg,#3672f8,#b01eff)",
      color: "#fff",
      marginRight: theme.spacing(1),
      width: "150px",
      "&:hover": {
        background: "linear-gradient(162deg,#3672f8,#b01eff)",
      },
    },
    stepTransition: {
      animation: "stepChange 0.3s ease-in-out",
    },
    loader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px",
    },
    image: {
      maxWidth: "12%",
      height: "auto",
      minWidth: "130px",
      minHeight: "50px",
      maxHeight: "95px",
      width: "auto",
    },
    tick: {
      ...tickPositionStyles("top-right"),
      position: "absolute", // Add this to make pseudo-elements relative to the tick
      "&::before, &::after": {
        content: "''",
        position: "absolute",
        width: "10px", // Adjust the width as needed
        height: "2px", // Adjust the height as needed
        background: "#fff", // Adjust the background color as needed
      },
      "&::before": {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotate(45deg)", // Adjust the rotation as needed
      },
      "&::after": {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotate(-45deg)", // Adjust the rotation as needed
      },
    },

    heading: {
      fontSize: "24px", // can adjust the font size of heading
      fontWeight: "bold",
      marginBottom: theme.spacing(2),
    },
    subHeading: {
      fontSize: "18px", //  can adjust the font size of subheading
      marginBottom: theme.spacing(2),
    },
    customStepper: {
      "& .customStep": {
        opacity: 0.5,
        transform: "translateX(-50%)",
        position: "relative",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        border: "2px solid #fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "14px",
        fontWeight: "bold",
      },
      "& .customStep.accomplished": {
        opacity: 1,
        backgroundColor: "#3672f8",
        color: "#fff",
      },
      "& .customStep.t-current": {
        width: "40px",
        height: "40px",
        transform: "scale(1.5)",
        transition: "transform 0.25s",
      },
      "& .customStep.t-middle": {
        opacity: 1,
        transform: "translateX(0)",
        transitionDelay: "0.25s",
      },
    },
  };
});

function getSteps() {
  return Object.keys(jsonData);
}

const LinearStepper = ({ setPercentageValue }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItemsArray, setSelectedItemsArray] = useState([]);
  const steps = getSteps();

  const calculatePercentage = (step) => {
    const totalSteps = steps.length;
    const stepPercentage = (100 / totalSteps) * (step + 1);
    return stepPercentage;
  };

  const transitionStyles = {
    entering: { transform: "scale(1.5)" },
    entered: { transform: "scale(1)" },
    exiting: { transform: "scale(1.5)" },
    exited: { transform: "scale(1)" },
  };

  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveStep(activeStep + 1);
      setIsLoading(false);
      const stepPercentage = calculatePercentage(activeStep + 1);
      setPercentageValue(stepPercentage);
      // console.log("Percentage Value:", Math.round(percentageValue));
    }, 1000);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      console.log("Can't go back from the first step");
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setActiveStep(activeStep - 1);
        setIsLoading(false);
        const stepPercentage = calculatePercentage(activeStep - 1);
        setPercentageValue(stepPercentage);
        // console.log("Percentage Value:", Math.round(percentageValue));
      }, 1000);
    }
  };

  const handleSkip = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBoxClick = (label, tickPosition) => {
    if (selectedItems.includes(label)) {
      setSelectedItems(selectedItems.filter((item) => item !== label));
    } else {
      setSelectedItems([...selectedItems, label]);
    }
    collectSelectedItems({ label, tickPosition });
  };

  const collectSelectedItems = (selectedItem) => {
    // Check if the item is already in the selectedItemsArray
    const isSelected = selectedItemsArray.some(
      (item) => item.label === selectedItem.label
    );

    if (isSelected) {
      // If the item is already selected, remove it from the array
      setSelectedItemsArray(
        selectedItemsArray.filter((item) => item.label !== selectedItem.label)
      );
    } else {
      // If the item is not selected, add it to the array
      setSelectedItemsArray([...selectedItemsArray, selectedItem]);
    }
  };
  console.log("selectedItemsArray ::", selectedItemsArray);

  return (
    <div>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        variant="progress"
        className={`customStepper ${
          activeStep !== steps.length - 1 ? "t-current" : ""
        }`}
      >
        {steps.map((step, index) => {
          const stepData = jsonData[step];
          return (
            <Step key={index}>
              {/* StepLabel is now inside the Grid */}
              <Grid container alignItems="center">
                <Grid item>
                  <StepLabel>
                    {stepData.heading && (
                      <Typography variant="h1" className={classes.heading}>
                        {stepData.heading}
                      </Typography>
                    )}
                    {stepData.subHeading && (
                      <Typography variant="h2" className={classes.subHeading}>
                        {stepData.subHeading}
                      </Typography>
                    )}
                  </StepLabel>
                </Grid>
                <Grid item>
                  {({ accomplished, transitionState, index }) => (
                    <div
                      style={transitionStyles[transitionState]}
                      className={`customStep ${
                        accomplished ? "accomplished" : ""
                      } ${index === activeStep ? "t-middle" : ""}`}
                    >
                      {index}
                    </div>
                  )}
                </Grid>
              </Grid>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {jsonData[steps[activeStep]].options.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={jsonData[steps[activeStep]].options.length === 4 ? 3 : 4}
                className={classes.gridItem}
                key={item.id}
              >
                <Paper
                  className={`${classes.paper} ${
                    selectedItems.includes(item.label) ? classes.selected : ""
                  } ${
                    activeStep !== steps.length - 1
                      ? classes.stepTransition
                      : ""
                  }`}
                  onClick={() => {
                    handleBoxClick(item.label);
                    collectSelectedItems(item);
                  }}
                >
                  <div className={classes.tick}></div>
                  <div className={classes.imageContainer}>
                    {Array.isArray(item.imageUrl) ? (
                      item.imageUrl.map((image, index) => (
                        <React.Fragment key={index}>
                          {image && (
                            <img
                              src={image}
                              alt={item.label}
                              className={classes.image}
                            />
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <React.Fragment>
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.label}
                            className={classes.image}
                          />
                        )}
                      </React.Fragment>
                    )}
                  </div>

                  <Typography className={classes.cardLabel}>
                    {item.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <div className={classes.loader}>
            {isLoading ? (
              <CircularProgress color="primary" size={40} />
            ) : (
              <>
                <CustomButton
                  label={<span>{backArrowSVG} Previous</span>}
                  onClick={handleBack}
                  disabled={activeStep === 0 || isLoading}
                  className={classes.btnPrevious}
                />

                <CustomButton
                  label="Skip"
                  onClick={handleSkip}
                  disabled={isLoading}
                />

                <CustomButton
                  label={activeStep === steps.length - 1 ? "Finish" : "Next"}
                  onClick={handleNext}
                  disabled={isLoading}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

LinearStepper.propTypes = {
  percentageValue: PropTypes.number.isRequired,
  setPercentageValue: PropTypes.func.isRequired,
};

export default LinearStepper;
