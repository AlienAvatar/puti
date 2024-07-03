import { Route, Routes, BrowserRouter} from 'react-router-dom';
import LoginPage from './pages/routes/Login';
import RegisterPage from './pages/routes/Regis';
import MainPage from './pages/routes/Main';
import ArticlePage from './pages/routes/Article';
import { Component, React } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import DetailPage from './pages/routes/Detail';
import LandingPage from './pages/components/templates/landing-page/LandingPage';
import HomePage from './pages/components/templates/landing-page/HomePage';
import SignIn from './pages/components/templates/sign-in/SignIn';
import SignUp from './pages/components/templates/sign-up/SignUp';
import ModelPage from './pages/routes/Model';
import ListPage from './pages/components/templates/landing-page/ListPage';
import DetailPage from './pages/components/templates/landing-page/DetailsPage';
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
      return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" exact element={<MainPage />}></Route>
              <Route path="/home" exact element={<HomePage />}></Route>
              <Route path="/login" element={<LoginPage dataHandle = {this.dataHandle}/>}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route path="/article" element={<ArticlePage />}></Route>
              <Route path="/:id" element={<DetailPage />}></Route>
              <Route path="/test" element={<LandingPage />}></Route>
              <Route path="/signin" element={<SignIn />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/model" element={<ModelPage />}></Route>
              <Route path="/buddha" element={<ListPage category="古佛降世"/>}></Route>
              <Route path="/buddha_dharma" element={<ListPage category="羌佛说法"/>}></Route>
              <Route path="/office" element={<ListPage category="公告"/>}></Route>
              <Route path="/recognition" element={<ListPage category="认证恭贺"/>}></Route>
              <Route path="/holy_realization" element={<ListPage category="羌佛圣量"/>}></Route>
              <Route path="/holy_occurrences" element={<ListPage category="羌佛圣迹"/>}></Route>
              <Route path="/buddha_virtue" element={<ListPage category="圆满佛格"/>}></Route>
              <Route path="/wuming" element={<ListPage category="妙谙五明"/>}></Route>
              <Route path="/savelivingbings" element={<ListPage category="渡生成就"/>}></Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </>
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
