import CusLayout from "../components/CusLayout";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import { connect } from 'react-redux';
import { actionCreators as articleActionCreators } from '../../../store/article';
import { bindActionCreators } from 'redux';
import store from "../../../store";
import '../assets/css/detail.css';
import { Button, Menu, Dropdown, Space, Tooltip, Empty, Spin, notification, message, Skeleton, Typography, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { CloseCircleOutlined } from '@ant-design/icons';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);
const { Title } = Typography;

function DetailPage(props) {
    //登录的信息data需要传值到MainPage
    const { num } = useParams();
    
    const [test,setTest] = useState(false);
    const [articleData,setArticleData] = useState();
    //const [status,setStatus] = useState();

    
    useEffect(()=>{
      const fetchData = async ()=>{
        const response = await props.articleDataFn.queryAricleByNum(num);
        setArticleData(response);
        console.log('response',response);
        // if(typeof response !== 'undefined' && response.code === 200){
        //   console.log('response',response);
        //   setArticleData(response.data);
        //   setTest(true);
        //   openNotification('top');
        // }else{
        //   setTest(false);
        // }
      }
    
      fetchData();
    },[]);

    //消息通知
    const openNotification = (placement) => {
      //const articleData = store.getState();
      notification.open({
        message: '读取失败',
        description: articleData.articleReducer.articleData.message,
        placement,
        icon: <CloseCircleOutlined className="detail-notification-icon"/>
      });
    };

    // store.subscribe(()=>{
    //     const state = store.getState();
        
    //     console.log('state',state);
    //     setArticleData(state.articleReducer.articleData.data);
    // //   setStatus(state.articleReducer.status);
    // })
    
    let content = "";
    const status = store.getState().articleReducer.status;
    if(status === "waiting"){
      content = <div className="detail-text">
                  <div className="detail-loading">
                    <Spin className="detail-spin" indicator={antIcon} tip="加载中..."/>
                    <Skeleton active />
                  </div>
                </div>
    }else if(status === "received"){
      //判断返回的Code，如果为200，则成功返回数据
      const code = store.getState().articleReducer.code;
      if(code == 200){
        // const articleData = store.getState().articleReducer.articleData.data;
        content = <div className="detail-text">
                        <div className="detail-content">
                          <div className="detail-title">
                            <Title level={3}>{articleData.title}</Title>
                          </div>
                          <div className="writer">
                            <Space>
                              <span>{articleData.author}</span>
                              <span>{ num }</span>
                            </Space>
                          </div>
                          <Divider />
                        </div>
                    </div>
      }else{
        content = <div className="detail-text">
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
      }
    }else{
      //无数据
      content = <div className="detail-text">
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
    }
      

    

    return (
      <div className="App">
        {/* 没有data值传递 */}
        <CusLayout children = {content} >
          
        </CusLayout>
      </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(DetailPage)