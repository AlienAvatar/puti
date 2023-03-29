import CusLayout from "../components/CusLayout";
import store from '../../../store';
import CusEditor from "../components/CusEditor";
import '../assets/css/article.css'
import DOMPurify from 'dompurify';
import { useRef, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { saveArticle } from '../../../store/article/';
import { actionCreators as articleActionCreators } from '../../../store/article';
import { bindActionCreators } from 'redux';
import { LoadingOutlined } from '@ant-design/icons';
import Notification from "../components/Notification";

const token = window.sessionStorage.getItem('token');
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

function ArticlePage(props) {
    //const htmlConvertedContent = htmlRef.current.getConvertedContentHTML();

    // useEffect(()=>{
    //   if(token){
    //     store.dispatch(validToken(token));
    //   }else{
    //     alert('未登录')
    //     sessionStorage.removeItem('token');
    //     window.location.href = window.location.origin + '/login'
    //   }
    // },[]);

    const [ author, setAuthor ] = useState("匿名");
    const [ articleData, setArticleData ] = useState();
    const [ notification, setNotification ] = useState();
    const [ isSave, setIsSave ] = useState(false);
    const [ num, setNum ] = useState();

    //const [ content, setContent] = useState();

    const saveClick = async (contentJson) => {
      const response = await props.articleDataFn.saveArticle(contentJson);
    }

    store.subscribe(()=>{
      const state = store.getState();
      console.log('state',state);
      setArticleData(state.articleReducer.articleData);
      
      if(articleData.staus === "waiting"){
        setNotification(<Notification props={"保存中"}></Notification>)
      }else if(articleData.status === "received"){
        setNotification(<Notification props={"保存成功"}></Notification>)
        setIsSave(true);
      }else{
        setNotification(<Notification props={"保存失败"}></Notification>)
      }
    })

    const content = <div className="rich-after-save-text">
                          <header className="rich-header">
                            文章
                          </header>
                          
                      </div>
    // const content = <div className="rich-text">
    //                     <header className="rich-header">
    //                       Rich Text Editor
    //                     </header>
    //                     {notification}
    //                     <CusEditor saveClick={saveClick}>
    //                       <p>Article</p>
    //                     </CusEditor>
    //                   </div>
    if(isSave){
      // setContent(beforeSave);
    }else{
      // setContent(afterSave);
    }

    
    
    return (
      <CusLayout children={content}>
        
      </CusLayout>
    );
  }
  
//这个函数来指定如何把当前store state映射到展示组件的props中
const mapStateToProps = state => {
  return {
    articleReducer : state.articleReducer,
  }
}

//接受dispatch()方法并返回期望注入到展示组件的props中的方法
const mapDispatchToProps = dispatch => {
  return{
    articleDataFn : bindActionCreators(articleActionCreators,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ArticlePage);
  