import { Button, Checkbox, Form, Input } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { BackgroundGradient } from '../components/BackgroundGradient';
import { AppstoreOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import ImgSrc  from "../assets/main/main.jpg";
import ArtCard from "../components/ArticleCard"
import ArtList from '../components/ArticleList';
import CusFooter from '../components/CusFooter';
import CusHeader from '../components/CusHeader';
import { useRef,useState,useEffect } from 'react';
import axios from "axios";

const { Header, Content, Footer } = Layout;
const PATH_LOGIN = '/login/validUser';

const PARAM_USERNAME = 'UserName=';
const PARAM_PASSWORD = 'Password=';

export default function LoginPage() {
  const [data, setData] = useState("");
  const [success, setSuccess] = useState(false);

  const formRef = useRef(null);
  
  const onFinish = (values) => {
    console.log('values:', values);

    axios.post(`${PATH_LOGIN}`,{
      "UserName" : values.username,
      "Password" : values.password
    })
    .then(response=>{
      console.log('response',response.data);
      setData(response.data);
      if(response.data.code == 200){
        setSuccess(true);
      }else{
        setSuccess(false);
      }
    });
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

  return (
    <Layout>
        {/* 自定义头部 */}
        <CusHeader prop="login" isLogin={success}/>
      
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
                Regis
              </Button>
            </Form.Item>
          </Form>

          {!success && (
          <div className="mt-2 text-xs italic text-gray-500">
              {data.message}
          </div>
          )}
        </Content>
      
      <CusFooter />
      <Footer style={{ textAlign: 'center' }}>
        Copyright ©2023 菩提道行版权所有
      </Footer>
    </Layout>
    
  );
}
