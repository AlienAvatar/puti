import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
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
// import { commentactionCreators as actionCreators } from '../../../../../store/comment';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import BG_IMG from '../../../assets/main/bg_brick.jpg';
import DOMPurify from 'dompurify';
import { Typography, Card, Divider } from "antd";
import { Col, Row, message, Input, Form, Space, Button  } from 'antd';
import '../../../assets/css/detail.css'
import { EyeOutlined, LikeOutlined, LikeFilled} from '@ant-design/icons';
import { margin } from '@mui/system';

const { Title, Text, Description  } = Typography;
const { Meta } = Card;
const { TextArea } = Input;

const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 16,
  },
};

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

const createMarkup = (html) => {
  return {
      __html : DOMPurify.sanitize(html)
  }
};

const convertDate = (date_string) =>{
  const date = new Date(date_string);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`
}



function DetailPage(props) {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });
    const [articledata, setArticleData] = useState(null);
    const [isSupport, setIsSupport] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [commentValue, setCommentValue] = useState('');
    const [commentdata, setCommentData] = useState(null);

    const toggleCustomTheme = () => {
      setShowCustomTheme((prev) => !prev);
    };
    
    const toggleColorMode = () => {
      // 切换颜色模式
      // 如果当前模式为 'dark'，则设置为 'light'；否则设置为 'dark'
      setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const handleSupport = async ()=>{
      try {
        const id = window.location.pathname.replace("/", "");;
        const response = await props.artilceDataFn.updateSupportCountAc(id);
        if(response && response.status === "success"){
           
            setIsSupport(true);
        }else if(response && response.status === "conflict"){
          warning();
          console.log('conflict');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const warning = () => {
      messageApi.open({
        type: 'warning',
        content: '该用户已经点赞',
      });
    };

    const error = () => {
      messageApi.open({
        type: 'error',
        content: '系统错误',
      });
    };

    const onFinish = (values) => {
      console.log(values);
    };

    useEffect(() => {
        async function fetchData() {
          try {
            const id = window.location.pathname.replace("/", "");;
            const response = await props.artilceDataFn.searchArticleByIdAc(id);
            if(response && response.status === "success"){
              setArticleData(response.data);
            }else{
              error();
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }

        fetchData();
    }, []);

    if(articledata === null){
        return ;
    }

    let created_at = convertDate(articledata.article.created_at);
    const convertedHTML = <div  dangerouslySetInnerHTML={createMarkup(articledata.article.content)}>
                          </div>

    const description = <Text type="secondary">
                            <span>{created_at} </span>
                            <span><EyeOutlined /> {articledata.article.views_count} </span>
                            <LikeOutlined /> {articledata.article.support_count}
                        </Text>;

    const title = <Meta style={{ textAlign: "center", padding: 10 }}
                        title={<Title level={3}>{articledata.article.title}</Title>}
                        description={description}
                 />;

    return (
      <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
        <CssBaseline />
        {/* title */}
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        {contextHolder}
        <Box sx={{ backgroundImage: `url(${BG_IMG})` }}>
          <Row gutter={16}>
            <Col span={4}>
            </Col>
            
            <Col span={16}>
              <Container id="features" sx={{ py: { xs: 1, sm: 10 } }}>
                  <Card title={title} bordered={false}
                    actions={[
                      isSupport ? 
                      <LikeFilled style={{ fontSize: '24px', color: "#4876ee" }} key="support" disabled />
                       : <LikeOutlined style={{ fontSize: '24px', color: "#4876ee" }}  key="support" onClick={handleSupport}/>,
                    ]}
                  >
                    <Typography className='single_content' style={{ backgroundColor: "#fff"}}>
                      {convertedHTML}
                    </Typography>
                  </Card>

                  <Card  bordered={false} style={{margin: "20px 0" }}>
                    <Divider style={{padding: 10}} orientation="left">评论区</Divider>

                    <Form
                      onFinish={onFinish}
                    >
                      <Form.Item
                        name="content"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <TextArea
                          value={commentValue}
                          onChange={(e) => setCommentValue(e.target.value)}
                          placeholder="写下你要评论的内容"
                          autoSize={{
                            minRows: 3,
                            maxRows: 5,
                          }}
                        />
                      </Form.Item>
                      <Form.Item {...tailLayout}>
                          <Button type="primary" htmlType="submit" style={{width: "50%"}}>
                            提交
                          </Button>
                      </Form.Item>
                    </Form>
                  </Card>
              </Container>

            </Col>
            <Col span={4}>
              
            </Col>
          </Row>
          
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
    // commentData : state.commentReducer,
  }
}

//接受dispatch()方法并返回期望注入到展示组件的props中的方法
//此参数可以是一个 function，或者一个 object。
const mapDispatchToProps = dispatch => {
  return{
    artilceDataFn : bindActionCreators(articleActionCreators, dispatch),
    // commentDataFn : bindActionCreators(commentActionCreators, dispatch),
  }
}

//作为传递给 connect 的第二个参数，mapDispatchToProps 用于 dispatch actions 给 store。
//这是触发 state 变更的唯一方法
export default connect(mapStateToProps,mapDispatchToProps)(DetailPage);