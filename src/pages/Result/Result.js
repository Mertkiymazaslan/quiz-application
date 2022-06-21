import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./Result.css";
import HomeIcon from "@material-ui/icons/Home";
import { useSearchParams } from "react-router-dom";

const Result = ({name}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const wrongCount = searchParams.get("wrongCount");
  const skippedCount = searchParams.get("skippedCount");
  const score = searchParams.get("score");

  return (
    <div className="result">
      <span className="finalScore">Final Score : {score} </span>
      <div className="statistics">
        <p>Wrong answer: <span style={{color:"red"}}>{wrongCount}</span></p>
        <p>Skipped questions: <span style={{color:"#E3A412"}}>{skippedCount}</span></p>
      </div>

      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        startIcon={<HomeIcon />}
        onClick={() => navigate("/")}
      >
        Go to homepage
      </Button>
    </div>
  );
};

export default Result;
