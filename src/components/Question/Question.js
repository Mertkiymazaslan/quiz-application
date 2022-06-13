import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Question.css";

const Question = ({ currQuestion, setCurrentQuestion, setScore, totalQuestionNumber, questionIndex}) => {
    const [selected, setSelected] = useState(false);
    const navigate = useNavigate();

    const nextHandler = () => {
        if(questionIndex === totalQuestionNumber){ //quiz bitti
            navigate("/result");
        }
        else{
            setCurrentQuestion((prev) => prev+1);
        }   
        setSelected(false);
    };

    const selectHandler = (option) => {
        setSelected(true);
        if(option === currQuestion.answer){
            setScore(prev => prev+1)
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
                className={`singleOption ${(selected) && (option === currQuestion.answer ? "correct" : "wrong")}`}
                key={option}
                onClick={() => selectHandler(option)}
                disabled={selected}
              >
                {option}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            onClick={() => {}}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={nextHandler}
          >
            Next Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
