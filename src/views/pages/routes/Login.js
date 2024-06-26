import { Button, Checkbox, Form, Input, Avatar, Space } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Row, Col, notification } from 'antd';
import { AppstoreOutlined, HomeOutlined, UserOutlined, CheckCircleTwoTone, CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import { useRef,useState,useEffect, createContext, useLayoutEffect } from 'react';
import CusLayout from '../components/CusLayout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as loginActionCreators } from '../../../store/login';
import '../assets/css/detail.css';

const { Header, Content, Footer } = Layout;
const PATH_LOGIN = '/login/validUser';
const PATH_HOME = '/';

const backToHome = () =>{
  window.location.href = window.location.origin + PATH_HOME;
}

function LoginPage(props) {
  const [userData, setUserData] = useState("");
  const [success, setSuccess] = useState(false);
  
  const formRef = useRef(null);
  const dataRef = useRef(null);

  const onFinish = async (values) => {
    //console.log('values:', values);
    const postParam = {
      "UserName" : values.username,
      "Password" : values.password
    };
    const response = await props.userDataFn.loginAc(postParam);
    if(typeof response !== 'undefined' && response.code === 200){
      setSuccess(true);
      setUserData(response);
      
      window.sessionStorage.setItem('token',response.data.token);
      props.userDataFn.syncInfoAc(response);

      dataRef.current = response.data;
      setTimeout(backToHome,3000);
    }else{
      setSuccess(false);
      console.log("response",response);

      const notificationParam = {
        message : response.message,
        description : "",
        icon : <CloseCircleOutlined className="detail-notification-error-icon"/>
      }
      openNotification('top',notificationParam);
    }
  };
  
  const onFinishFailed = (errorInfo) => {
    console.warn('Failed:', errorInfo);
  };
  
  const onReset = () => {
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

  const LoginRenderDom = 
  <Content className="site-layout" style={{ paddingTop: '30px' }}>
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
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space size={[8,16]}>
                <Button type="primary" htmlType="submit">
                  提交111
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  重置
                </Button>
                <Button type="link" htmlType="button" onClick={onRegis}>
                  注册
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
        <Col span={6}></Col>
      </Row>
    

    {!success && (
    <div className="mt-2 text-xs italic text-gray-500">
        {userData.message}
    </div>
    )}
  </Content>

  const SuccessfulLogInDom =
  <Content className="site-layout" style={{ padding: '30px 150px', textAlign : 'center' }}>
      <Row>
        <Col span={6}></Col>
        <Col span={12}>
          <Space size={16}>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<CheckCircleOutlined />} />登录成功，正在跳转主页...
          </Space>
        </Col>
        <Col span={6}></Col>
      </Row>
  </Content>
  
  return (
    <CusLayout children={success ? SuccessfulLogInDom : LoginRenderDom} userData={userData} isAuth={success} > 

    </CusLayout>


  );
}

//这个函数来指定如何把当前store state映射到展示组件的props中
const mapStateToProps = state => {
  return {
    userData : state.loginReducer,
  }
}

//接受dispatch()方法并返回期望注入到展示组件的props中的方法
const mapDispatchToProps = dispatch => {
  return{
    userDataFn : bindActionCreators(loginActionCreators,dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);
