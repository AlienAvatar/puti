import { Button, Checkbox, Form, Input, Avatar, Space } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { BackgroundGradient } from '../components/BackgroundGradient';
import { AppstoreOutlined, HomeOutlined, UserOutlined, CheckCircleTwoTone, CheckCircleOutlined} from '@ant-design/icons';
import ImgSrc  from "../assets/main/main.jpg";
import ArtCard from "../components/ArticleCard"
import ArtList from '../components/ArticleList';
import CusFooter from '../components/CusFooter';
import CusHeader from '../components/CusHeader';
import { useRef,useState,useEffect, createContext } from 'react';
import axios from "axios";
import CusLayout from '../components/CusLayout';

const { Header, Content, Footer } = Layout;
const PATH_LOGIN = '/login/validUser';
const PATH_HOME = '/';
const testContext = createContext();

const backToHome = () =>{
  window.location.href = window.location.origin + PATH_HOME;
}

export default function LoginPage(props) {
  console.log('props', props);
  const [data, setData] = useState("");
  const [success, setSuccess] = useState(false);
  

  const formRef = useRef(null);
  const dataRef = useRef(null);

  const onFinish = (values) => {
    //console.log('values:', values);

    axios.post(`${PATH_LOGIN}`,{
      "UserName" : values.username,
      "Password" : values.password
    })
    .then(response=>{
      console.log('response',response.data);
      
      if(response.data.code == 200){
        setSuccess(true);
        setData(response.data);
        //window.sessionStorage.setItem('token',response.data.userBeanVo.token);
        props.dataHandle(response.data);
        dataRef.current = response.data;
        //setTimeout(backToHome,3000);
        
      }else{
        setSuccess(false);
      }
    });
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
        {data.message}
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
    <CusLayout children={success ? SuccessfulLogInDom : LoginRenderDom} data={data} isLogin={success} > 

    </CusLayout>


  );
}
