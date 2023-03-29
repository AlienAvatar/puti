import { Breadcrumb, Layout, Menu, theme, Avatar, Space } from 'antd';
import { AppstoreOutlined, HomeOutlined, UserOutlined,EditOutlined } from '@ant-design/icons';
import TitleBg from '../assets/header/header_title.png'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { validToken, syncInfoAc } from '../../../store/login/ActionCreators';
import store from '../../../store';
import { bindActionCreators } from 'redux';
import { actionCreators as loginActionCreators } from '../../../store/login';
import { useParams } from 'react-router';

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

const token = window.sessionStorage.getItem('token');

function CusHeader(props) {
    const [isAuth,setIsAuth]  = useState(false);
    const [userData, setUserData] = useState(props.userData);

    useEffect(()=>{
      if(token){
        try{
          store.dispatch(validToken(token));
        }catch{
          sessionStorage.removeItem('token');
          window.location.href = window.location.origin + '/login'
        }
      }
    },[]);
    
    store.subscribe(()=>{
      const state = store.getState();

      if(state.loginReducer.status == "received" || state.loginReducer.status == "sync"){
        setUserData(state.loginReducer.userData);
        setIsAuth(true);
      }
    });
    
    const pathName = window.location.pathname;
    const [ current, setCurrent] = useState(pathName);
    
    const onClickHandle = (e) => {
      window.location.href = window.location.origin + e.key;
      setCurrent(e.key);
    };

    
    const defaultAvatarSrc = "https://overwatch.nosdn.127.net/1/images/heroes/dva/icon-portrait.png";
    const defaultNickName = "NickName";

    let itemMenu = defaultItems;
    let avatarSrc = defaultAvatarSrc;
    let nickName = defaultNickName;

    if(isAuth){
      itemMenu = AfterLoginInitems;
      avatarSrc = userData.data.avatar;
      nickName = userData.data.nickName;
    }

    const HeaderClickHandle = () => {
      window.location.href = window.location.origin;
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

              onClick={HeaderClickHandle}
          />


          {isAuth && (
          <Space style={{float:'right',color:'rgba(255, 255, 255, 0.65)'}} size={16} >
              <Avatar src={avatarSrc} />
              <span>{nickName}</span>
          </Space>
          )}

          <Menu style={{float:'right'}} theme="dark" onClick={onClickHandle} selectedKeys={[current]} mode="horizontal" items={itemMenu} /> 
          
        </Header>
    );

}

const mapStateToProps = state => {
  return {
    userData: state.userData,
  };
};


export default connect(mapStateToProps)(CusHeader);