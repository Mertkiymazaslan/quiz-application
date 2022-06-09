import { Button, Container, MenuItem, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { makeStyles } from "@material-ui/core";
import { findByLabelText } from "@testing-library/react";
import "./Home.css";
import axios from "axios";

const useStyles = makeStyles({
  textField: {
    marginBottom: "25px",
  },
});

const Home = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((response) => {
      setCategories(response.data.trivia_categories);
    });
  }, []);


  return (
    <div className="content">
      <img className="banner" src="./question.svg" alt="quiz"></img>
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quiz Settings</span>

        <div className="settings_select">
          <TextField
            className={classes.textField}
            label="Enter Your Name"
            variant="outlined"
          />

          <TextField
            className={classes.textField}
            select
            label="Select Category"
            variant="outlined"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            className={classes.textField}
            select
            label="Select Difficulty"
            variant="outlined"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <MenuItem key={"Easy"} value="easy">
              Easy
            </MenuItem>
            <MenuItem key={"Medium"} value="medium">
              Medium
            </MenuItem>
            <MenuItem key={"Hard"} value="hard">
              Hard
            </MenuItem>
          </TextField>

          <Button variant="contained" color="primary" size="large">
            Start Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
