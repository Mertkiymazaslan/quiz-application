
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Quiz from './pages/Quiz/Quiz';
import Result from './pages/Result/Result';
import axios from "axios"


function App() {
  const [token, setToken] = useState("");
  const [questions, setQuestions] = useState(null);
  const [score ,setScore] = useState(0);
  //app.jsde fetchleri yapmak, stateleri tutmak dogru mu? Bos mu olmalı tamamen?
  //context kullanmalı mıyjm ?

  const getToken = async () => { //functionu ayrı yazmakla useeffect icinde yazmanın farkı ne?
    const { data } = await axios.get(`https://opentdb.com/api_token.php?command=request`);
    setToken(data.token); //session token to prevent same questions exist in quiz.
  };

  const decodeString = (Str) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = Str;
    return textArea.value;
  }

  const getQuestions = async (amount, category, difficulty) => { 
    const { data } = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple&token=${token}`);
    //databasede secili özelliklerde yeterli soru olmayabilir. Bunu da handle et bir şekilde.
    setQuestions(
      data.results.map((item, index) => {
        const answer = decodeString(item.correct_answer);
        const options = [
          ...item.incorrect_answers.map((a) => decodeString(a)),
          answer
        ];

        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(item.question),
          answer: answer,
          options: options.sort(() => Math.random() - 0.5),
          category: item.category
        };
      })
    );
  };

  useEffect(() => {
    getToken();
  },[])

  return (
    <BrowserRouter>
      <div>
        <Header />

        <Routes>
          <Route path='/' exact element={<Home getQuestions={getQuestions} setScore={setScore} setQuestions={setQuestions}/>} />
          <Route path='/quiz' exact element={<Quiz questions={questions} score={score} setScore={setScore}/>} />
          <Route path='/result' exact element={<Result score={score}/>} />
        </Routes>

      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
