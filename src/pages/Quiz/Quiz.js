import { CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import Question from "../../components/Question/Question";
import "./Quiz.css"

const Quiz = ({ questions, score, setScore }) => {
  //Kullanıcının seçtiği alanda yeterli sayıda soru olmayabilir!! O zaman bunu bildir. mesaj ile
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <div className="quiz">
      {/* {questions.map((item) => <div key={item.id}> 
        <p>{item.question}</p>
        <p>{item.options}</p>
        <p>{item.answer}</p>
        <br></br>
      </div>)} */}

      {questions ? (
        <>
          <div className="quizInfo">
              <span>{questions[0].category}</span>
              <span>Score: {score}</span>
          </div>
          <p>Question: {currentQuestion+1}</p>

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
