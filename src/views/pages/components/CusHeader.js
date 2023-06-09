import { Button, Layout, Menu, Dropdown, Avatar, Space } from 'antd';
import { HomeOutlined, UserOutlined,EditOutlined } from '@ant-design/icons';
import TitleBg from '../assets/header/header_title.png'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { validToken } from '../../../store/login/ActionCreators';
import store from '../../../store';
import '../assets/css/global.css';

const { Header, Content, Footer } = Layout;

const defaultItems = [
    {
      label: '首页',
      key: '/',
      value: '',
      // icon: <HomeOutlined />,
    },
    {
        label: '写文章',
        key: '/article',
        value: 'article',
        // icon: <EditOutlined />,
    },
    {
      label: '古佛降世',
      key: '/buddha',
      value: 'buddha',
      // icon: <EditOutlined />,
    },
    {
      label: '羌佛说法',
      key: '/buddha-dharma',
      value: 'buddha-dharma',
      // icon: <EditOutlined />,
    },
    {
      label: '羌佛公告',
      key: '/office',
      value: 'office',
      // icon: <EditOutlined />,
    },
    {
      label: '认证恭贺',
      key: '/recognition',
      value: 'recognition',
      // icon: <EditOutlined />,
    },
    {
      label: '羌佛圣量',
      key: '/holy-realization',
      value: 'holy-realization',
      // icon: <EditOutlined />,
    },
    {
      label: '羌佛圣迹',
      key: '/holy-occurrences',
      value: 'holy-occurrences',
      // icon: <EditOutlined />,
    },
    {
      label: '圆满佛格',
      key: '/buddha-virtue',
      value: 'buddha-virtue',
      // icon: <EditOutlined />,
    },
    {
      label: '妙谙五明',
      key: '/wuming',
      value: 'wuming',
      // icon: <EditOutlined />,
    },
    {
      label: '渡生成就',
      key: '/savelivingbings',
      value: 'savelivingbings',
      // icon: <EditOutlined />,
    },
    {
      label: '佛教论坛',
      key: '/forum',
      value: 'forum',
      // icon: <EditOutlined />,
    },
    {
      label: '登录',
      key: '/login',
      value: 'login',
      // icon: <UserOutlined />,
    },
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

const logOutHandle = () => {
    window.sessionStorage.removeItem('token');
    window.location.reload();
}

const items = [
  {
    key: '1',
    label: (
      <Button type="primary" onClick={logOutHandle}>
        注销
      </Button>
    ),
    className:'ss',
  },
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
    
    const test = <Avatar src={avatarSrc}>
                  <span>{nickName}</span>
                     </Avatar>
    return (
        <Header style={{ position: 'sticky', top: 0, zIndex: 99, width: '100%' }}>
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
              <Space style={{float:'right',color:'rgba(255, 255, 255, 0.65)',marginLeft:'16px'}} size={16} >
                <Dropdown
                className="g-bg-header"
                menu={{
                  items,
                }}
                placement="bottom"
              >
                <Space size={16} >
                  <Avatar src={avatarSrc} />
                  <span>{nickName}</span>
                </Space>
              </Dropdown>
            </Space>
          )}

          <Menu style={{float:'right'}} theme="dark" onClick={onClickHandle} 
                selectedKeys={[current]} mode="horizontal" items={itemMenu} /> 
          
        </Header>
    );

}

const mapStateToProps = state => {
  return {
    userData: state.userData,
  };
};


export default connect(mapStateToProps)(CusHeader);