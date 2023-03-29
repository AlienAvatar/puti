import { Button, Checkbox, Form, Input, Avatar, Space } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { AppstoreOutlined, HomeOutlined, UserOutlined, CheckCircleTwoTone, CheckCircleOutlined} from '@ant-design/icons';
import { useRef,useState,useEffect, createContext, useLayoutEffect } from 'react';
import CusLayout from '../components/CusLayout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as loginActionCreators } from '../../../store/login';

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

  const LoginRenderDom = 
  <Content className="site-layout" style={{ padding: '30px 150px' }}>
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
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onRegis}>
          Register
        </Button>
      </Form.Item>
    </Form>

    {!success && (
    <div className="mt-2 text-xs italic text-gray-500">
        {userData.message}
    </div>
    )}
  </Content>

  const SuccessfulLogInDom =
  <Content className="site-layout" style={{ padding: '30px 150px', textAlign : 'center' }}>
      <Space size={16}>
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<CheckCircleOutlined />} />登录成功，正在跳转主页...
      </Space>
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
