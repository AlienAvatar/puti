import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { AppstoreOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import ImgSrc  from "../assets/main/main.jpg";
import ArtCard from "../components/ArticleCard"
import ArtList from '../components/ArticleList';
import CusLayout from '../components/CusLayout';
import { useEffect, useState, useParams } from 'react';

const { Header, Content, Footer } = Layout;


function MainPage(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //登录的信息data需要传值到MainPage
  const [data, setData] = useState("");
  

  console.log('MainPage',props);
  // const token = window.sessionStorage.getItem('token');
  // let isLogin = false;
  // if(token != null && token != ''){
  //   isLogin = true;
  // }
  const content = (<Content className="site-layout" style={{ padding: '30px 150px' }}>
                  <img style={{ width: '100%' }} src={ImgSrc} />

                  <Breadcrumb style={{ margin: '0 0' }}>
                    {/* <Breadcrumb.Item><ArtCard /></Breadcrumb.Item> */}
                    
                  </Breadcrumb>
                  
                  <ArtList />
                  {/* <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>Content</div> */}
                      
                </Content>);
  

  return (
    <div className="App">
      {/* 没有data值传递 */}
      <CusLayout children={content} >
        
      </CusLayout>
      {/* <CusLayout children={content} isLogin={isLogin}></CusLayout> */}
    </div>
  );
}

export default MainPage;
