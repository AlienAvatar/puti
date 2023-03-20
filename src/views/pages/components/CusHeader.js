import { Breadcrumb, Layout, Menu, theme, Avatar, Space } from 'antd';
import { AppstoreOutlined, HomeOutlined, UserOutlined,EditOutlined } from '@ant-design/icons';
import TitleBg from '../assets/header/header_title.png';
import {useState, setCurrent, useEffect} from 'react'

const { Header, Content, Footer } = Layout;

const defaultItems = [
    {
      label: '首页',
      key: '/',
      value: '',
      icon: <HomeOutlined />,
    },
    {
        label: '写文章',
        key: '/article',
        value: 'article',
        icon: <EditOutlined />,
    },
    {
      label: '登录',
      key: '/login',
      value: 'login',
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

const AfterLoginInitems = [
  {
    label: '首页',
    key: '/',
    value: '/',
    icon: <HomeOutlined />,
  },
  {
      label: '写文章',
      key: '/article',
      value: 'article',
      icon: <EditOutlined />,
  }
];
export default function CusHeader(prop) {
    //console.log('prop',prop);
    const pathName = window.location.pathname;
    const [ current, setCurrent] = useState(pathName);
    const [ token,setToken ] = useState('');
    
    useEffect(()=>{
      setToken(window.sessionStorage.getItem('token'));
    })

    const onClickHandle = (e) => {
      window.location.href = window.location.origin + e.key;
      setCurrent(e.key);
    };

    
    const defaultAvatarSrc = "https://overwatch.nosdn.127.net/1/images/heroes/dva/icon-portrait.png";
    const defaultNickName = "NickName";

    let itemMenu = defaultItems;
    let avatarSrc = defaultAvatarSrc;
    let nickName = defaultNickName;

    if(prop.isLogin){
      itemMenu = AfterLoginInitems;
      avatarSrc = prop.data.userBeanVo.avatar;
      nickName = prop.data.userBeanVo.nickName;
    }

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
          <Space style={{float:'right',color:'rgba(255, 255, 255, 0.65)'}} size={16} >
              <Avatar src={avatarSrc} />
              <span>{nickName}</span>
          </Space>
          )}

          <Menu style={{float:'right'}} theme="dark" onClick={onClickHandle} selectedKeys={[current]} mode="horizontal" items={itemMenu} /> 
          
        </Header>
    );
}
  