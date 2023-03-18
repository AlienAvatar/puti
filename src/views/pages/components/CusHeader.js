import { Breadcrumb, Layout, Menu, theme, Avatar, Space } from 'antd';
import { AppstoreOutlined, HomeOutlined, UserOutlined,EditOutlined } from '@ant-design/icons';
import TitleBg from '../assets/header/header_title.png';
import {useState, setCurrent} from 'react'

const { Header, Content, Footer } = Layout;

const items = [
    {
      label: '首页',
      key: '',
      value: '/',
      icon: <HomeOutlined />,
    },
    {
        label: '写文章',
        key: 'article',
        value: '/article',
        icon: <EditOutlined />,
      },
    {
      label: '登录',
      key: 'login',
      value: '/login',
      icon: <UserOutlined />,
    },
    // {
    //   label: (
    //     <Space size={16}>
    //       <Avatar src='https://overwatch.nosdn.127.net/1/images/heroes/dva/icon-portrait.png' />
    //       <span>nickname</span>
    //     </Space>
    //     ),
    //   key:'user'
    // }
];

export default function CusHeader(prop) {
    console.log('prop',prop);

    const [current, setCurrent] = useState(prop.prop);
    const {nickName,setNickName} = useState("nick");

    const onClickHandle = (e) => {
      console.log('click',e);
      window.location.href = window.location.origin + "/" + e.key;
      setCurrent(e.key);
    };

    return (
        <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
          <div
              style={{
              float: 'left',
              width: 128,
              height: 31,
              margin: '16px 24px 16px 0',
              backgroundImage: `url(${TitleBg})`,
              }}
          />


          {prop.isLogin && (
          <Space style={{float:'right'}} size={16}>
              <Avatar src='https://overwatch.nosdn.127.net/1/images/heroes/dva/icon-portrait.png' />
              <span>nickname</span>
          </Space>
          )}

          <Menu style={{float:'right'}} theme="dark" onClick={onClickHandle} selectedKeys={[current]} mode="horizontal" items={items} /> 
          
        </Header>
    );
}
  