import React from "react";

const ProgressBar = ({ percent }) => {
  const progressBarStyle = {
    width: "100%",
    height: "4px",
    background: "lightgray",
  };

  const filledProgressBarStyle = {
    width: `${percent}%`,
    height: "4px",
    background: "linear-gradient(to right, #fefb72, #f0bb31)",
  };

  return (
    <div>
      <div style={progressBarStyle}></div>
      <div style={filledProgressBarStyle}></div>
    </div>
  );
};

export default ProgressBar;
