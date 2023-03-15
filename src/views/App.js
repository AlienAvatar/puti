import {Route, Routes } from 'react-router-dom';
import LoginPage from './pages/routes/Login';
import RegisterPage from './pages/routes/Regis';
import MainPage from './pages/routes/Main';
import ArticlePage from './pages/routes/Article';

//const basename = import.meta.env.BASE_URL

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/article" element={<ArticlePage />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

const NotFound = () => {
  return <div>你来到了没有知识的荒原</div>
}

export default App;
