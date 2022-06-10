import { CircularProgress } from "@material-ui/core";
import React from "react";

const Quiz = ({ questions, score, setScore }) => {
  //Kullanıcının seçtiği alanda yeterli sayıda soru olmayabilir!! O zaman bunu bildir. mesaj ile
  return (
    <div>
      {/* {questions.map((item) => <div key={item.id}> 
        <p>{item.question}</p>
        <p>{item.options}</p>
        <p>{item.answer}</p>
        <br></br>
      </div>)} */}

      {questions ? (
        "sdfsdfsd"
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
