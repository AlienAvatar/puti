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
import Hero from './components/Hero';
import LogoCollection from './components/LogoCollection';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Office from './components/Office';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import getLPTheme from './getLPTheme';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as articleActionCreators } from '../../../../../store/article';
import { useState, useEffect } from 'react';

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

function HomePage(props) {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [articledata, setArticledata] = useState(null);
  const [buddha_data_list, setBuddhaDataList] = useState(null);
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
          const response = await props.artilceDataFn.searchAllArticleAc();
          if(response && response.status === "success"){
            setArticledata(response.data);
            const buddha_data_list = response.data.filter(data => data.category === "公告");
            setBuddhaDataList(buddha_data_list);
           
          }else{
            console.log('error');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      fetchData();
  }, []);

  
  
  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      {/* title */}
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      
      <Hero />
      <Office props={buddha_data_list}/>
      <Box sx={{ bgcolor: 'background.default' }}>
      
      </Box>
      <Box sx={{ bgcolor: '#444' }}>
        <Footer />
      </Box>
      
      
      {/* <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer /> 
      </Box> */}
      {/* <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      /> */}
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
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);