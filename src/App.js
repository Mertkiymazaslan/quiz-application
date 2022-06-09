
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Quiz from './pages/Quiz/Quiz';
import Result from './pages/Result/Result';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />

        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/quiz' exact element={<Quiz />} />
          <Route path='/result' exact element={<Result />} />
        </Routes>

      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
