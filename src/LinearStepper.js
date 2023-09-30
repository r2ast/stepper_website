import React, { useState } from "react";
import PropTypes from 'prop-types';
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
  const tickPositionStyles = (position) => {
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

    switch (position) {
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
    paper: {
      textAlign: "center",
      padding: theme.spacing(2),
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      position: "relative",
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
    },
    heading: {
      fontSize: "24px", // can adjust the size
      fontWeight: "bold",
      marginBottom: theme.spacing(2),
    },
    subHeading: {
      fontSize: "18px", //  can adjust the size
      marginBottom: theme.spacing(2),
    },
  };
});

function getSteps() {
  return Object.keys(jsonData);
}

const LinearStepper = ( {percentageValue, setPercentageValue }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const steps = getSteps();

  const calculatePercentage = (step) => {
    const totalSteps = steps.length;
    const stepPercentage = (100 / totalSteps) * (step + 1);
    return stepPercentage;
  };

  const handleNext = () => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveStep(activeStep + 1);
      setIsLoading(false);
      const stepPercentage = calculatePercentage(activeStep + 1);
      setPercentageValue(stepPercentage);
      console.log("Percentage Value:", Math.round(percentageValue));
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
        console.log("Percentage Value:", Math.round(percentageValue));
      }, 1000);
    }
  };

  const handleSkip = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBoxClick = (label) => {
    if (selectedItems.includes(label)) {
      setSelectedItems(selectedItems.filter((item) => item !== label));
    } else {
      setSelectedItems([...selectedItems, label]);
    }
  };

  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep} variant="progress">
        {steps.map((step, index) => {
          const stepData = jsonData[step];
          return (
            <Step key={index}>
              <StepLabel>
                <Typography variant="h1" className={classes.heading}>
                  {stepData.heading}
                </Typography>
                <Typography variant="h2" className={classes.subHeading}>
                  {stepData.subHeading}
                </Typography>
              </StepLabel>
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
                  onClick={() => handleBoxClick(item.label)}
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
