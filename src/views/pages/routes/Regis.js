import { Button, Checkbox, Form, Input } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import ImgSrc  from "../assets/main/main.jpg";
import ArtCard from "../components/ArticleCard"
import ArtList from '../components/ArticleList';
import CusFooter from '../components/CusFooter';
import CusHeader from '../components/CusHeader';
import { useRef } from 'react';

const { Header, Content, Footer } = Layout;

function RegisterPage() {
  const formRef = useRef(null);

  const onFinish = (values) => {
    console.log('Success:', values);
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
        <CusHeader prop="regis" />
      
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
                Fill form
              </Button>
            </Form.Item>
          </Form>
        </Content>
      
      <CusFooter />
      <Footer style={{ textAlign: 'center' }}>
        Copyright ©2023 菩提道行版权所有
      </Footer>
    </Layout>
    
  );
}

export default RegisterPage;
