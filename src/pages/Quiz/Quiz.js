import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Question from "../../components/Question/Question";
import "./Quiz.css"

const Quiz = ({ questions, score, setScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if(!questions)
      navigate("/")
  },[])

  return (
    <div className="quiz">

      {questions ? (
        <>
          <div className="quizInfo">
              <span>Category: {questions[0].category}</span>
              <span>Score: {score}</span>
          </div>
          <p style={{"fontSize": "larger"}}>Question: {currentQuestion+1}</p>

          <Question 
            currQuestion={questions[currentQuestion]}
            setCurrentQuestion={setCurrentQuestion}
            setScore={setScore}
            totalQuestionNumber={questions.length}
            questionIndex={currentQuestion+1}
          />
        </>
        
      ) : (
        <CircularProgress
          style={{ display: "flex", margin: "auto" }}
          color="inherit"
          thickness={1}
          size={150}
        />
      )}
    </div>
  );
};

export default Quiz;
