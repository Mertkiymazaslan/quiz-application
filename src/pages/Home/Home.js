import { Container, TextField, Typography } from "@material-ui/core";
import React from "react";
import "./Home.css";
import { makeStyles } from "@material-ui/core";
import { findByLabelText } from "@testing-library/react";
import "./Home.css";

const useStyles = makeStyles({
  nameInput: {
    marginBottom: "25px",
  },
});

const Home = () => {
  const classes = useStyles();

  return (
    <div className="content">
      <img className="banner" src="./question.svg" alt="quiz"></img>
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quiz Settings</span>

        <div className="settings_select">
          <TextField
            className={classes.nameInput}
            label="Enter Your Name"
            variant="outlined"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
