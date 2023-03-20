import { Route, Routes, useLocation, useNavigate, BrowserRouter} from 'react-router-dom';
import LoginPage from './pages/routes/Login';
import RegisterPage from './pages/routes/Regis';
import MainPage from './pages/routes/Main';
import ArticlePage from './pages/routes/Article';
import CusHeader from './pages/components/CusHeader';
import { Component, useState, React } from 'react';

//const basename = import.meta.env.BASE_URL

class App extends Component{
  state = {
    data : ''
  }

  dataHandle = (data) => {
    this.setState({
      data : data
    })
  };

  render() {
      //const location = useLocation()
      
      console.log('App',this.state.data);
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage data={ this.state.data }/>}></Route>
            <Route path="/login" element={<LoginPage dataHandle = {this.dataHandle}/>}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/article" element={<ArticlePage />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      );
  }
}
// function App() {
  
//   const [data,setData] = useState("");
//   const history = useNavigate();
//   const dataHandle = (data) => {
//     console.log('App',data);
//   };

//   return (
//       <Routes>
//         <Route path="/" element={<MainPage />}></Route>
//         <Route path="/login" element={<LoginPage dataHandle = {this.dataHandle}/>}></Route>
//         <Route path="/register" element={<RegisterPage />}></Route>
//         <Route path="/article" element={<ArticlePage />}></Route>
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//   );
// }

const NotFound = () => {
  return <div>你来到了没有知识的荒原</div>
}

export default App;
