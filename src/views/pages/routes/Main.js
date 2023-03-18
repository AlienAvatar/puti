import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { BackgroundGradient } from '../components/BackgroundGradient';
import { AppstoreOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import ImgSrc  from "../assets/main/main.jpg";
import ArtCard from "../components/ArticleCard"
import ArtList from '../components/ArticleList';
import CusFooter from '../components/CusFooter';
import CusHeader from '../components/CusHeader'
import { useLocation } from 'react-router';

const { Header, Content, Footer } = Layout;

const items = [
  {
    label: '首页',
    key: 'home',
    value: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '登录',
    key: 'login',
    value: '/login',
    icon: <UserOutlined />,
  },
];


function MainPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  
  
  return (
    <div className="App">
      <Layout>
        {/* 自定义头部 */}
        <CusHeader prop=""/>
      
        {/* Body */}
        <Content className="site-layout" style={{ padding: '30px 150px' }}>
          <img style={{ width: '100%' }} src={ImgSrc} />

          <Breadcrumb style={{ margin: '0 0' }}>
            {/* <Breadcrumb.Item><ArtCard /></Breadcrumb.Item> */}
            
          </Breadcrumb>
          
          <ArtList />
          {/* <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>Content</div> */}
              
        </Content>
      
      <CusFooter />
      <Footer style={{ textAlign: 'center' }}>
        Copyright ©2023 菩提道行版权所有
      </Footer>
    </Layout>
    </div>
  );
}

export default MainPage;
