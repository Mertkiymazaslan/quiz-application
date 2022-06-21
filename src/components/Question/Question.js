import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import "./Question.css";
import Icon from "@material-ui/core/Icon";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const Question = ({
  currQuestion,
  setCurrentQuestion,
  totalQuestionNumber,
  questionIndex,
  setScore,
  score
}) => {
  const duration = 25;
  const [selected, setSelected] = useState(false);
  const [nextButtonText, setNextButtonText] = useState("Next");
  const [counter, setCounter] = useState(duration);
  const [wrongCount, setWrongCount] = useState(0);
  const [skippedQuestionCount, setSkippedQuestionCount] = useState(0);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter((prev) => prev-1), 1000);
    if (counter === 0){
      //time is up
      nextHandler();
    }

    return () => clearInterval(timer);
  }, [counter]);

  const navigate = useNavigate();

  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress
            color={counter > 5 ? "primary" : "secondary"}
            variant="determinate"
            {...props}
          />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">
            {counter}s
          </Typography>
        </Box>
      </Box>
    );
  }
  const nextHandler = () => {
    if(!selected) //kullanıcı secim yapmadan soruyu pas geciyorsa
      setSkippedQuestionCount(prev => prev+1)
    if (questionIndex === totalQuestionNumber) {
      //quiz bitti
      const plus = !selected ? 1 : 0;
      navigate({
        pathname: "/result",
        search: createSearchParams({
          score: `${score}`,
          wrongCount: `${wrongCount}`,
          skippedCount: `${skippedQuestionCount + plus}`
        }).toString()
      });
    } else {
      setCounter(duration);
      if (questionIndex === totalQuestionNumber - 1) {
        setNextButtonText("Submit Quiz");
      }
      setCurrentQuestion((prev) => prev + 1);
    }
    setSelected(false);
  };

  const quitHandler = () => {
    navigate({
      pathname: "/result",
      search: createSearchParams({
        score: `${score}`,
        wrongCount: `${wrongCount}`,
        skippedCount: `${skippedQuestionCount}`
      }).toString()
    });
  };

  const selectHandler = (option) => {
    setSelected(true);
    if (option === currQuestion.answer) {
      setScore((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }
  };

  const showAnswerHandler = () => {
    if(!selected){
      setSelected(true);
      setCounter(10);
      setSkippedQuestionCount(prev => prev+1)
    }
  };

  return (
    <div className="question">
      <div className="singleQuestion">
        <h2>{currQuestion.question}</h2>
        <div className="options">
          {currQuestion.options &&
            currQuestion.options.map((option) => (
              <button
                className={`singleOption ${
                  selected &&
                  (option === currQuestion.answer ? "correct" : "wrong")
                }`}
                key={option}
                onClick={() => selectHandler(option)}
                disabled={selected}
              >
                {option}
              </button>
            ))}
        </div>
        <div className="progressBar">
            <LinearProgressWithLabel value={counter * 4} />
        </div>
        <div className="controls">
          <Button
            className="finishButton"
            variant="contained"
            color="secondary"
            size="large"
            endIcon={<ExitToAppIcon />}
            onClick={quitHandler}
          >
            Finish
          </Button>
          <button
            className="showAnswerButton"
            onClick={showAnswerHandler}
          >
            Show Answer
          </button>
          <Button
            className="nextButton"
            color="primary"
            variant="contained"
            size="large"
            endIcon={<NavigateNextIcon />}
            onClick={nextHandler}
          >
            {nextButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
