import CusLayout from "../components/CusLayout";
import CusEditor from "../components/CusEditor";
import '../assets/css/article.css'
import '../assets/css/global.css'
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector  } from 'react-redux';
import { actionCreators as articleActionCreators } from '../../../store/article';
import { bindActionCreators } from 'redux';
import { CloseCircleOutlined, CheckCircleOutlined, LoadingOutlined, InfoCircleOutlined} from '@ant-design/icons';
import { notification } from 'antd';
import { fetchValidTokenPosts } from '../../../store/register/Reducer';
import { saveArticlePost } from '../../../store/article/Reducer';

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
    // const htmlConvertedContent = htmlRef.current.getConvertedContentHTML();
    console.log("props",props);

    const dispatch = useDispatch();
    const postStatus = useSelector((state) => state.articleReducer.status);
    // const tokenStatus = useSelector((state) => state.registerReducer.status);
    const tokenStatus = props.registerReducer.status;

    const [ author, setAuthor ] = useState("匿名");
    const [ isSave, setIsSave ] = useState(false);
    
    useEffect(()=>{
      if(tokenStatus === "idle"){
        if(token){
          dispatch(fetchValidTokenPosts(token));
        }else{
          const notificationParam = {
            message : "未登录",
            description : "",
            icon : <InfoCircleOutlined className="g-icon-color-blue"/>
          }
          openNotification('top',notificationParam);
          //未登录情况下，跳转到登录界面
          setTimeout(() => {
            sessionStorage.removeItem('token');
            window.location.href = window.location.origin + '/login'
          }, 2000);
        }
      }
    },[])
    
    useEffect(()=>{
      if(tokenStatus === "succeeded"){
        setAuthor(props.registerReducer.userData.data.nickName);
      }
    },[tokenStatus, dispatch]);

   
    //当点击保存时
    useEffect(()=>{
      if(postStatus === "loading"){
        const notificationParam = {
          message : "保存中",
          description : "",
          icon : <LoadingOutlined />
        }
        openNotification('top',notificationParam);

      }else if(postStatus === "succeeded"){
        const notificationParam = {
          message : "保存成功",
          description : "",
          icon : <CheckCircleOutlined className="detail-notification-right-icon"/>
        }
        openNotification('top',notificationParam);
        setIsSave(true);
      }else if(postStatus === "failed"){
        const notificationParam = {
          message : "保存失败",
          description : "",
          icon : <CloseCircleOutlined className="detail-notification-error-icon"/>
        }
        openNotification('top',notificationParam);
      }
    },[postStatus,dispatch])
    
    //消息通知
    const openNotification = (placement,notificationParam) => {
      notification.open({
        message: notificationParam.message,
        description: notificationParam.description,
        placement,
        icon: notificationParam.icon
      });
    };

    const saveClick = async (postParam)  => {
      //const response = await props.articleDataFn.saveArticle(contentJson);

      const response = await dispatch(saveArticlePost(postParam));
      console.log('props', props);
      console.log("response",response);
      console.log("data",response.payload);
      if(typeof response.payload !== "undefined" && response.payload.code == 200){
        setTimeout(()=>{
          window.location.href = window.location.origin + "/detail/" + response.payload.data.num;
        },1000);
      }
    }

    const content = <div className="rich-text-content">
                        <header className="rich-header">
                          文本编辑器
                        </header>
                        
                        <CusEditor saveClick={saveClick} postStatus={postStatus} openNotification={openNotification} author={author}>
                          <p>Article</p>
                        </CusEditor>
                      </div>
    return (
      <CusLayout children={content}>
        
      </CusLayout>
    );
  }
  
//这个函数来指定如何把当前store state映射到展示组件的props中
const mapStateToProps = state => {
  return {
    articleData : state,
    registerReducer : state.registerReducer,
  }
}

//接受dispatch()方法并返回期望注入到展示组件的props中的方法
const mapDispatchToProps = dispatch => {
  return{
    articleDataFn : bindActionCreators(articleActionCreators,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ArticlePage);
  