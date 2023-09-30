import LinearStepper from "./LinearStepper";
import React, { useState } from 'react';
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

function App() {
  const [percentageValue, setPercentageValue] = useState(0);
  const updatePercentageValue = (newValue) => {
    setPercentageValue(newValue);
    console.log('Percentage Value in App.js:', Math.round(percentageValue));
  };
  return (
    <>
      <CssBaseline />
      <ProgressBar
        percent={percentageValue}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      />
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          <LinearStepper percentageValue={percentageValue} setPercentageValue={updatePercentageValue} />
        </Paper>
      </Container>
    </>
  );
}

export default App;
