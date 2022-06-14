import {
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import "./Home.css";
import { makeStyles } from "@material-ui/core";
import { findByLabelText } from "@testing-library/react";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  textField: {
    marginBottom: "25px",
  },
  button: {
    marginTop: "20px",
  },
});

const Home = ({ getQuestions, setScore, setQuestions }) => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]); //will be fetched from api.
  const [categoryError, setCategoryError] = useState(false);
  const [difficultyError, setDifficultyError] = useState(false);
  const [questionNumError, setQuestionNumError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questionNum, setQuestionNum] = useState(8);
  const [apiQuestionError, setApiQuestionError] = useState(false);
  const navigate = useNavigate();

  const maxQuestionNumber = 15;
  const minQuestionNumber = 1;
  const apiQuestionErrorMessage =
    "There are not enough questions in the category and difficulty you selected. Please lower the amount or create a different quiz.";
  const enteredNumberErrorMessage = `Please enter a number between ${minQuestionNumber} and ${maxQuestionNumber}`;

  useEffect(() => {
    setScore(0);
    setQuestions(null);
    axios.get("https://opentdb.com/api_category.php").then((response) => {
      setCategories(response.data.trivia_categories); //error handling vs. ekle
    });
  }, []);

  const handleSubmit = async () => {
    if (!selectedCategory) setCategoryError(true);

    if (!difficulty) setDifficultyError(true);

    if (
      !questionNum ||
      questionNum > maxQuestionNumber ||
      questionNum < minQuestionNumber
    )
      setQuestionNumError(true);
    else if (difficulty && selectedCategory) {
      const questionsFetched = await getQuestions(
        questionNum,
        selectedCategory,
        difficulty
      ); //sonucu burada bekliyorum cünkü hatalı olursa (sorular gelmezse) diğer sayfaya gitmek istemiyorum.
      if (questionsFetched) {
        //sorular sorunsuz şekilde apiden alındıysa
        navigate("/quiz");
      } else {
        //hata oluştuysa (apide seçilen kategoride yeterli sayıda soru bulunmayabilir.)
        setApiQuestionError(true);
      }
    }
  };

  return (
    <div className="content">
      <img className="banner" src="./question.svg" alt="quiz"></img>
      <div className="settings">
        <span style={{ fontSize: 30 }}>Create a New Quiz</span>

        <div className="settings_select">
          <TextField
            className={classes.textField}
            select
            label="Select Category"
            variant="outlined"
            value={selectedCategory}
            error={categoryError}
            onChange={(e) => {
              setCategoryError(false);
              setApiQuestionError(false);
              setSelectedCategory(e.target.value);
            }}
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
            error={difficultyError}
            onChange={(e) => {
              setDifficultyError(false);
              setApiQuestionError(false);
              setDifficulty(e.target.value);
            }}
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

          <TextField
            label="Enter Number Of Questions"
            variant="outlined"
            type="number"
            value={questionNum}
            error={questionNumError}
            onChange={(e) => {
              setQuestionNum(e.target.value);
              setQuestionNumError(false);
            }}
          />
          {questionNumError && (
            <p className="errorMessage">{enteredNumberErrorMessage}</p>
          )}
          {apiQuestionError && (
            <p className="errorMessage">{apiQuestionErrorMessage}</p>
          )}

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
