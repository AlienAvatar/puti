import CusLayout from "../components/CusLayout";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import { connect, useDispatch, useSelector } from 'react-redux';
import { actionCreators as articleActionCreators } from '../../../store/article';
import { bindActionCreators } from 'redux';
import '../assets/css/detail.css';
import { Button, Menu, Dropdown, Space, Tooltip, Empty, Spin, notification, message, Skeleton, Typography, Divider, Alert, Col, Row, Watermark  } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { CloseCircleOutlined, CheckCircleOutlined, LikeOutlined } from '@ant-design/icons';
import { addlikeCountPost, fetchArticleByNumGet } from '../../../store/article/Reducer';
import DOMPurify from 'dompurify';
import { convertToHTML } from 'draft-convert';

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
    const { num } = useParams();//http://localhost:3000/detail/92SAFUH 中的92SAFUH
    const dispatch = useDispatch();
    //const posts = useSelector(selectPostByNum);
    const postStatus = useSelector((state) => state.articleReducer.status);

    const paramData = {
      "num" : num,
    }
    
    useEffect(()=>{
      if (postStatus === 'idle') {
        dispatch(fetchArticleByNumGet(paramData));
      }else if(postStatus === 'failed'){
        const notificationParam = {
          message : "读取失败",
          icon : <CloseCircleOutlined className="detail-notification-error-icon"/>
        }
        openNotification('top',notificationParam);
        
        setTimeout(()=>{
          window.location.href = window.location.origin + '/login';
        },2000);

      }else if(postStatus == 'succeeded'){
        const notificationParam = {
          message : "读取成功",
          icon : <CheckCircleOutlined className="detail-notification-right-icon"/>
        }
        openNotification('top',notificationParam);

      }
    },[postStatus,dispatch])
    
    //消息通知
    const openNotification = (placement,notificationParam) => {
      notification.open({
        message: notificationParam.message,
        description: props.articleData.articleReducer.error,
        placement,
        icon: notificationParam.icon
      });
    };

    //
    const createMarkup = (html) => {
      return {
        __html : DOMPurify.sanitize(html)
      }
    };
    
    const LikeClickHandle = () => {
      dispatch(addlikeCountPost(paramData));
    }

    let content;
    if(postStatus === "loading"){
      content = <Row>
                  <Col span={6}></Col>
                  <Col  span={12}>
                    <Spin className="detail-spin" indicator={antIcon} tip="加载中..."/>
                    <Skeleton active />
                  </Col>
                  <Col span={6}></Col>
                </Row>
    }else if(postStatus === "succeeded"){
      const articleData = props.articleData.articleReducer.articleData.data;
      
      //content转换为
      const convertedContent = articleData.content;
      console.log("articleData",convertedContent);
      const convertedHTML = <div
                          className="preview"
                          dangerouslySetInnerHTML={createMarkup(convertedContent)}>
                        </div>
                        
      content = <Row>
                  <Col span={6}></Col>
                  <Col  span={12} style={{ marginBottom : '20px' }}>
                    <div className="detail-title">
                      <Title level={3}>{articleData.title}</Title>
                    </div>
                    <div className="writer">
                      <span>文件编号: { num }</span>
                      <Space className="detail-author-group">
                        <span>作者：{articleData.author}</span>
                        <div>
                          <span>创建日期：{articleData.createDate}</span>
                        </div>
                      </Space>
                    </div>
                    <Divider />
                    <div>
                      {convertedHTML}
                    </div>
                    <Row>
                      <Col span={24} style={{textAlign : 'center'}}>
                      <Tooltip title="点赞" >
                        <Button shape="circle"
                          style={{ width: '64px', height: '64px' }}
                          icon={<LikeOutlined style={{ fontSize: '32px', color: '#08c' }}/>}
                          onClick={LikeClickHandle}
                        />
                      </Tooltip>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={6}></Col>
                </Row>
        
    }else if(postStatus === "failed"){
      content = <Row>
                  <Col span={6}></Col>
                  <Col  span={12} style={{ marginBottom : '20px' }}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </Col>
                  <Col span={6}></Col>
                </Row>
    }else{
      content = <Row>
                  <Col span={6}></Col>
                  <Col  span={12} style={{ marginBottom : '20px' }}>
                    <Alert
                        message="Error"
                        description="无法查询文章，请联系管理员"
                        type="error"
                        showIcon
                    />
                    <div className="detail-text">
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                    </Col>
                  <Col span={6}></Col>
                </Row>
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
    articleData : state,
  }
}

//接受dispatch()方法并返回期望注入到展示组件的props中的方法
const mapDispatchToProps = dispatch => {
  return{
    articleDataFn : bindActionCreators(articleActionCreators,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailPage)