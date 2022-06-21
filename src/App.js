import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Quiz from "./pages/Quiz/Quiz";
import Result from "./pages/Result/Result";
import axios from "axios";

function App() {
  // const [token, setToken] = useState("");
  const [questions, setQuestions] = useState(null);
  //app.jsde fetchleri yapmak, stateleri tutmak dogru mu? Bos mu olmalı tamamen?
  //context kullanmalı mıyjm ?

  // const getToken = async () => { //tokeni artık kullanmıyorum..
  //   const { data } = await axios.get(`https://opentdb.com/api_token.php?command=request`);
  //   setToken(data.token); //session token to prevent same questions exist in quiz.
  // };

  const decodeString = (Str) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = Str;
    return textArea.value;
  };

  const getQuestions = async (amount, category, difficulty) => {
    //WHY NO SESSION TOKEN ?
    //Normalde session token kullanarak yapmıştım ancak buglı çalıştığı  için kaldırdım. Artık quizde aynı sorular denk gelebilir.(session token bunu engelliyordu)
    //bug sebebi: normalde api, secilen alanda yeterli soru yoksa response_code:1 dönüyor. başarılı ise 0 ve tokendeki tüm farklı sorular tükendiyse(tekrar aynı soruları sorması gerekiyorsa) 4 dönüyor
    //ancak token kullandığım zaman, mesela 15 soru sectik ve apide o kategoride o kadar soru yok ise normalde 1 dönmesi lazımken 4 dönüyor sanki o kadar soru var ama token tükenmiş gibi.
    // bu sebepler tokeni resetlesem bile hiçbir zaman o kadar soru olmayacağı için her zaman 4 dönecek ve tekrar tekrar tokeni resetleyeceğim, asla soruları ekrana getirmeyecek. (normalde 1 dönmesi lazım)
    //bu sebeple tokeni kaldırıyorum artık random sırayla soracak aynı sorular gelebilir ve eğer response_code 1 dönerse kullanıcıya bu kategoride bu kadar soru bulunmadığını ileten bir mesaj göstereceğim.

    // const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple&token=${token}`;
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    const { data } = await axios.get(url);
    if (data.response_code === 1) {
      //apide yeterli soru yok.
      return false;
    } else {
      //yeterli soru varsa
      setQuestions(
        data.results.map((item, index) => {
          const answer = decodeString(item.correct_answer);
          const options = [
            ...item.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];

          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(item.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5), //randomly shuffle the options
            category: item.category,
          };
        })
      );
      return true;
    }
  };

  // useEffect(() => { token kullanımı kaldırıldı sebebi yukarıda yazıyor.
  //   getToken();
  // },[])

  return (
    <BrowserRouter>
      <div>
        <Header />

        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                getQuestions={getQuestions}
                setQuestions={setQuestions}
              />
            }
          />
          <Route
            path="/quiz"
            exact
            element={
              <Quiz questions={questions} />
            }
          />
          <Route path="/result" element={<Result />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
