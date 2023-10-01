import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
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
      position: "absolute",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: "transparent",
      border: "2px solid #fff",
      display: "block",
      boxShadow: "0 2px 4px rgba(0,0,0,.13)",
      top: "5px",
      right: "5px",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: theme.spacing(2),
    },
    subHeading: {
      fontSize: "18px",
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

export default useStyles;
