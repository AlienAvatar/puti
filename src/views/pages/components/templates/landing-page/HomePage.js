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
import InteractiveList from './components/iList';
import ImgList from './components/iImgList';
import FoShuList from './components/FoShu';
import BG_IMG from '../../../assets/main/bg_brick.jpg'
import Announcement from './components/Announcement';

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
  const [office_data_list, setOfficeDataList] = useState(null);
  const [buddha_data_list, setBuddhaDataList] = useState(null);
  const [buddha_dharma_data_list, setBuddhaDharmaDataList] = useState(null);
  const [recognition_data_list, setRecognitionDataList] = useState(null);
  const [buddha_virtue_data_list, setBuddhaVirtueDataList] = useState(null);
  const [holy_realization_data_list, setHolyRealizationDataList] = useState(null);
  const [holy_occurrences_data_list, setHolyOccurencesDataList] = useState(null);
  const [wuming_data_list, setWumingDataList] = useState(null);
  const [savelivingbings_data_list, setSavelivingbingsDataList] = useState(null);
  const [true_dharma_news_data_list, setTrueDharmaNewsDataList] = useState(null);
  const [positive_data_list, setPositiveDataList] = useState(null);
  const [shared_data_list, setSharedDataList] = useState(null);
  const [foshu_data_list, setFoshuDataList] = useState(null);
  const [announcement_data_list, setAnnouncementDataList] = useState(null);
  const [office_announcement_data_list, setOfficeAnnouncementDataList] = useState(null);

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
            const office_list = response.data.filter(data => data.category === "公告");
            setOfficeDataList(office_list);
            const buddha_list = response.data.filter(data => data.category === "古佛降世");
            setBuddhaDataList(buddha_list);
            const buddha_dharma_list = response.data.filter(data => data.category === "羌佛说法");
            setBuddhaDharmaDataList(buddha_dharma_list);
            const recognition_list = response.data.filter(data => data.category === "认证恭祝");
            setRecognitionDataList(recognition_list);
            const buddha_virtue_list = response.data.filter(data => data.category === "圆满佛格");
            setBuddhaVirtueDataList(buddha_virtue_list);
            const holy_realization_list = response.data.filter(data => data.category === "羌佛圣量");
            setHolyRealizationDataList(holy_realization_list);
            const holy_occurrences_list = response.data.filter(data => data.category === "羌佛圣迹");
            setHolyOccurencesDataList(holy_occurrences_list);
            const wuming_list = response.data.filter(data => data.category === "妙谙五明");
            setWumingDataList(wuming_list);
            const savelivingbings_list = response.data.filter(data => data.category === "渡生成就");
            setSavelivingbingsDataList(savelivingbings_list);
            const shared_list = response.data.filter(data => data.category === "受用分享");
            setSharedDataList(shared_list);
            const true_dharma_news_list = response.data.filter(data => data.category === "正法新闻");
            setTrueDharmaNewsDataList(true_dharma_news_list);
            const positive_list = response.data.filter(data => data.category === "摧邪显正");
            setPositiveDataList(positive_list);
            const foshu_list = response.data.filter(data => data.category === "佛书法著");
            setFoshuDataList(foshu_list);
            const announcement_list = response.data.filter(data => data.category === "总部文告");
            setAnnouncementDataList(announcement_list);
            const office_announcement_list = response.data.filter(data => data.category === "羌佛文告");
            setOfficeAnnouncementDataList(office_announcement_list);
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
      <Box sx={{ backgroundImage: `url(${BG_IMG})`}}>
        {/* 公告栏 */}
        {/* <Office data_list={office_data_list}/> */}
        {/* 羌佛文告 */}
        <Announcement data_list={office_announcement_data_list} title="羌佛文告" href="/office_announcement" />
        {/* 总部文告 */}
        <Announcement data_list={announcement_data_list} title="总部文告" href="/announcement"/>

        {/* 古佛降世，羌佛说法 */}
        <InteractiveList 
            left_list={buddha_data_list} 
            right_list={buddha_dharma_data_list} 
            left_title="古佛降世" 
            right_title="羌佛说法"
            left_href= "/buddha"
            right_href= "/buddha_dharma"
            />

        <InteractiveList 
            left_list={recognition_data_list}
            right_list={buddha_virtue_data_list}
            left_title="认证恭祝"
            right_title="圆满佛格"
            left_href= "/recognition"
            right_href= "/buddha_virtue"
            />

        <InteractiveList
            left_list={holy_realization_data_list}
            right_list={holy_occurrences_data_list}
            left_title="羌佛圣量"
            right_title="羌佛圣迹"
            left_href= "/holy_realization"
            right_href= "/holy_occurrences"
            />

        <InteractiveList 
            left_list={wuming_data_list}
            right_list={savelivingbings_data_list}
            left_title="妙谙五明"
            right_title="渡生成就"
            left_href= "/wuming"
            right_href= "/savelivingbings"
            />

        {/* 佛书法著 */}
        <FoShuList data_list={foshu_data_list} href = "foshu"/>

        <InteractiveList 
            left_list={true_dharma_news_data_list}
            right_list={positive_data_list}
            left_title="正法新闻"
            right_title="摧邪显正"
            left_href= "/true_dharma_news"
            right_href= "/positive"
            />

        <ImgList
            data_list={shared_data_list} href="shared"
        />
      </Box>
      {/* <Box sx={{ bgcolor: 'background.default' }}>
      
      </Box> */}
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