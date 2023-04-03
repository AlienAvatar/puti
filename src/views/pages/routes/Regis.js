import { Button, Form, Input, Row, Col, notification, Space, Layout } from 'antd';
import CusFooter from '../components/CusFooter';
import CusHeader from '../components/CusHeader';
import { useRef } from 'react';
import { fetchAddUserPosts} from '../../../store/register/Reducer';
import { useDispatch, useSelector } from 'react-redux';
import { InfoCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import '../assets/css/global.css'

const { Header, Content, Footer } = Layout;

function RegisterPage() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.articleReducer.status);

  const onFinish = async (values) => {
    if(postStatus === "idle"){

      //密码不一致提示
      if(values.password !== values.repassword){
        const notificationParam = {
          message : "密码不一致",
          description : "",
          icon : <InfoCircleOutlined className="g-icon-color-blue"/>
        }

        openNotification('top', notificationParam);
      }
      

      var paramData = {
        "username" : values.username,
        "password" : values.password,
        "nickname" : values.nickname,
        "email" : values.email
      }

      const response = await dispatch(fetchAddUserPosts(paramData));
      if(typeof response.payload !== "undefined" && response.payload.code == 200){
        const notificationParam = {
          message : response.payload.message,
          description : "",
          icon : <CheckCircleOutlined className="detail-notification-right-icon"/>
        }
        openNotification('top',notificationParam);
        sessionStorage.setItem('token',response.payload.data.token);
        setTimeout(()=>{
          window.location.href = window.location.origin + "/";
        },1000);
      }else{
        const notificationParam = {
          message : "注册失败",
          description : response.payload.message,
          icon : <CloseCircleOutlined className="detail-notification-error-icon"/>
        }
        openNotification('top',notificationParam);
      }
      
    }

  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const onReset = () => {
    console.log("onReset",formRef)
    formRef.current?.resetFields();
  };
  
  const onRegis = () => {
    window.location.href = window.location.origin + "/register";
  };

  //消息通知
  const openNotification = (placement,notificationParam) => {
    notification.open({
      message: notificationParam.message,
      description: notificationParam.description,
      placement,
      icon: notificationParam.icon
    });
  };


  return (
    <Layout>
        {/* 自定义头部 */}
        <CusHeader prop="regis" />
      
        <Content className="site-layout" style={{ padding: '30px 150px' }}>
          <Row>
          <Col span={6}></Col>
          <Col span={12}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              ref={formRef}
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="昵称"
                name="nickname"
                rules={[{ required: true, message: '请输入昵称!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="确认密码"
                name="repassword"
                rules={[{ required: true, message: '请输入确认密码!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="邮箱"
                name="email"
                rules={[{ required: true, message: '请输入邮箱!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space size={[8,16]}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                  <Button htmlType="button" onClick={onReset}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>
          <Col span={6}></Col>
        </Row>
        </Content>
      
      <CusFooter />
      <Footer style={{ textAlign: 'center' }}>
        Copyright ©2023 菩提道行版权所有
      </Footer>
    </Layout>
    
  );
}

export default RegisterPage;
