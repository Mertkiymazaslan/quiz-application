import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./Result.css";
import HomeIcon from "@material-ui/icons/Home";

const Result = ({ score }) => {
  const navigate = useNavigate();

  return (
    <div className="result">
      <span className="title">Final Score : {score}</span>
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
