import {Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/Login';
import RegisterPage from './pages/login/Regis';
import MainPage from './pages/Main';

//const basename = import.meta.env.BASE_URL

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

const NotFound = () => {
  return <div>你来到了没有知识的荒原</div>
}

export default App;
