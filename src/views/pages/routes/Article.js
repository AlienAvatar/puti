import CusLayout from "../components/CusLayout";
import store from '../../../store';
import CusEditor from "../components/CusEditor";
import '../assets/css/article.css'
import DOMPurify from 'dompurify';
import { useRef, useEffect } from "react";
import { connect } from 'react-redux';
import { saveArticle } from '../../../store/article/';
import { actionCreators as articleActionCreators } from '../../../store/article';
import { bindActionCreators } from 'redux';

const token = window.sessionStorage.getItem('token');

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

    const saveClick = (contentJson) => {
      console.log('contentJson',contentJson);
      console.log('contentStr',JSON.stringify(contentJson));
      props.articleDataFn.saveArticle(contentJson);
      //store.dispatch(saveArticle(contentJson));
    }

    console.log('ArticlePage props',props);
    const content = ( 
                      <div className="rich-text">
                          <header className="rich-header">
                            Rich Text Editor
                          </header>
                          <CusEditor saveClick={saveClick}>
                            <p>Article</p>
                          </CusEditor>
                          

                      </div>
                      
                    );
    
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
  