import * as React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';
import getLPTheme from './getLPTheme';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as articleActionCreators } from '../../../../../store/article';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import DOMPurify from 'dompurify';
import { Avatar, List, Space } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons';
import BG_IMG from '../../../assets/main/bg_brick.jpg'
function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Toggle design language"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const createMarkup = (html) => {
    return {
        __html : DOMPurify.sanitize(html)
    }
};


function ListPage(props) {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });
    const [articledata, setArticledata] = useState([]);
    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');
    const category = props.category;

    const toggleColorMode = () => {
        // 切换颜色模式
        // 如果当前模式为 'dark'，则设置为 'light'；否则设置为 'dark'
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };

      
    useEffect(() => {
        async function fetchData() {
            try {
              const response = await props.artilceDataFn.searchAllArticleByCategoryAc(category);
            if(response && response.status === "success"){
                setArticledata(response.articles);
            }else{
                console.log('error');
            }
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    
    // if(articledata == null || articledata.length === 0){
    //     return;
    // }
    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
        <CssBaseline />
        {/* title */}
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />

        <Box sx={{ backgroundImage: `url(${BG_IMG})` }}>
        <Container id="features" sx={{ py: { xs: 1, sm: 15 } }}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12}>
                    <List
                    itemLayout="vertical"
                    size="default"
                    dataSource={articledata}
                    loading={articledata.length === 0}
                    pagination={{ position, align }}
                    split={true}
                    style={{backgroundColor: '#fff', borderRadius: 10}}
                    renderItem={(item) => {
                        const convertedHTML = <div 
                                                style={{
                                                    maxWidth: '50em',
                                                    maxHeight: '10em',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                                dangerouslySetInnerHTML={createMarkup(item.content)}>
                                            </div>
                    
                        return (
                            <List.Item
                                key={item.title}
                                actions={[
                                <IconText icon={TeamOutlined} text={item.views_count} key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text={item.support_count} key="list-vertical-like-o" />,
                                // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                ]}
                                extra={
                                    <img
                                    width={272}
                                    alt={item.cover_img}
                                    src={item.cover_img}
                                    />
                                }
                                style={{
                                    padding: '45px',
                                    borderBottom: '1px solid #7c7c7c',
                                    // backgroundColor: '#fff'
                                }}
                            >
                                <List.Item.Meta
                                    title={<a>{item.title}</a>}
                                />
                                {/* 将html去标签 */}
                                {convertedHTML}
                            </List.Item>
                        )
                    }}
                    />
                </Grid>
            </Grid>
        </Container>
        </Box>
        <Box sx={{ bgcolor: '#444' }}>
            <Footer />
        </Box>
        </ThemeProvider>
    );
}

//使用 mapStateToProps 获取数据
//在每一次 store state 改变时被调用。它接收整个 store state，并返回该组件需要的数据对象。
const mapStateToProps = (state) => {
  return {
    artilceData : state.articleReducer,
  }
}

//接受dispatch()方法并返回期望注入到展示组件的props中的方法
//此参数可以是一个 function，或者一个 object。
const mapDispatchToProps = dispatch => {
  return{
    artilceDataFn : bindActionCreators(articleActionCreators, dispatch),
  }
}

//作为传递给 connect 的第二个参数，mapDispatchToProps 用于 dispatch actions 给 store。
//这是触发 state 变更的唯一方法
export default connect(mapStateToProps,mapDispatchToProps)(ListPage);