import { Breadcrumb, Layout, Menu, theme, Avatar, Space } from 'antd';
import { AppstoreOutlined, HomeOutlined, UserOutlined,EditOutlined } from '@ant-design/icons';
import TitleBg from '../assets/header/header_title.png'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { validToken, syncInfoAc } from '../../../store/login/ActionCreators';
import store from '../../../store';
import { bindActionCreators } from 'redux';
import { actionCreators as loginActionCreators } from '../../../store/login';

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
    console.log('CusHeader props', props)
    let userData = '';
    
    //无法访问
    /**
     * Error: Actions must be plain objects. Use custom middleware for async actions.
    at Object.performAction (<anonymous>:1:31530)
    at $ (<anonymous>:1:33343)
    at e (<anonymous>:1:37236)
    at middleware.js:22:1
    at index.js:20:1
    at Object.dispatch (redux-logger.js:1:1)
    at dispatch (<anonymous>:1:55003)
    at Object.validToken (redux.js:578:1)
    at decodeToken (CusHeader.js:65:1)
    at CusHeader (CusHeader.js:71:1)
     * @param {} token 
     * @returns 
     */
    const decodeToken = async (token)=>{
      const { response} = await props.userDataFn.validToken(token);
      return response;
    }

    if(token){
      try{
        userData = decodeToken(token);
      }catch{
        sessionStorage.removeItem('token');
        window.location.href = window.location.origin + '/login'
      }
    }else{
      userData = store.getState().loginReducer.userData;
    }

    
    const isAuth = store.getState().loginReducer.isAuth;

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
      avatarSrc = userData.userBeanVo.avatar;
      nickName = userData.userBeanVo.nickName;
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
  //console.log('CusHeader mapStateToProps state',state);
  return {
    userData: state.userData,
  };
};

//接受dispatch()方法并返回期望注入到展示组件的props中的方法
const mapDispatchToProps = dispatch => {
  return{
    userDataFn : bindActionCreators(loginActionCreators,dispatch),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CusHeader);