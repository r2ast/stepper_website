import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  customButton: {
    marginRight: theme.spacing(1),
    margin: theme.spacing(1),
  },
}));

const CustomButton = ({ label, onClick, disabled, className }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.customButton }
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
