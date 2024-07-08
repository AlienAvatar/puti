import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Card as MuiCard } from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ForgotPassword from './ForgotPassword';
import getSignInTheme from './getSignInTheme';
import ToggleColorMode from './ToggleColorMode';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as loginActionCreators } from '../../../../../store/login';
import { message } from 'antd';
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

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  gap: theme.spacing(4),
  width: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    width: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'auto',
  paddingBottom: theme.spacing(12),
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.up('sm')]: {
    paddingBottom: 0,
    height: '100dvh',
  },
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.3), hsl(220, 30%, 5%))',
  }),
}));

function SignIn(props) {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignInTheme = createTheme(getSignInTheme(mode));
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  let input_valid = true;
  const [messageApi, contextHolder] = message.useMessage();

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitForgetPwd = () => {

  }

  const msg_error = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const postParam = {
      username : data.get('username'),
      password : data.get('password'),
    };
    //To Do 记录在哪个页面点的登录，登录后回调到所点页面
    let current_href = window.location.href;

    if(usernameError || passwordError){
      msg_error('请输入登录信息');
      return;
    }

    //登录
    const response = await props.userDataFn.loginAc(postParam);
    if(response && response.status === "success"){
      localStorage.setItem('nickname', response.nickname);
      localStorage.setItem('username', data.get('username'));
      localStorage.setItem('token', response.access_token);

      window.location.href = "/home";
    }else{
      msg_error('登录失败,请重试');
      localStorage.setItem('is_login', false);
      console.log('error')
    }
  };

  const validateInputs = () => {
    //const email = document.getElementById('email');
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    let isValid = true;

    // if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
    //   setEmailError(true);
    //   setEmailErrorMessage('Please enter a valid email address.');
    //   isValid = false;
    // } else {
    //   setEmailError(false);
    //   setEmailErrorMessage('');
    // }
    
    if(!username.value) {
      setUsernameError(true);
      isValid = false;
      input_valid = false;
    }else{
      setUsernameError(false);
      setUsernameErrorMessage('');
      input_valid = true;
    }

    if (!password.value) {
      setPasswordError(true);
      isValid = false;
      input_valid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
      input_valid = true;
    }

    return isValid;
  };

  return (
    <ThemeProvider theme={showCustomTheme ? SignInTheme : defaultTheme}>
      <CssBaseline />
      <SignInContainer direction="column" justifyContent="space-between">
        {contextHolder}
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            position: { xs: 'static', sm: 'fixed' },
            width: '100%',
            p: { xs: 2, sm: 4 },
          }}
        >
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            component="a"
            href="/home"
          >
            返回主页
          </Button>
          {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
        </Stack>
        <Stack
          sx={{
            justifyContent: 'center',
            height: { xs: '100%', sm: '100dvh' },
            p: 2,
          }}
        >
          <Card>
            <SitemarkIcon />
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              登录
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
            >
              <FormControl>
                {/* <FormLabel htmlFor="email">Email</FormLabel> */}
                {/* <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? 'error' : 'primary'}
                  sx={{ ariaLabel: 'email' }}
                /> */}
                <FormLabel htmlFor="username">用户名</FormLabel>
                <TextField
                  error={usernameError}
                  helperText={usernameErrorMessage}
                  id="username"
                  type="username"
                  name="username"
                  placeholder="用户名"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={usernameError ? 'error' : 'primary'}
                  sx={{ ariaLabel: 'email' }}
                />
              </FormControl>
              <FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <FormLabel htmlFor="password">密码</FormLabel>
                  {/* <Link
                    component="button"
                    onClick={handleClickOpen}
                    variant="body2"
                    sx={{ alignSelf: 'baseline' }}
                  >
                    忘记密码?
                  </Link> */}
                </Box>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? 'error' : 'primary'}
                />
              </FormControl>
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <ForgotPassword open={open} handleClose={handleClose} handleSubmitForgetPwd={handleSubmitForgetPwd}/>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                登录
              </Button>
              <Link
                href="/sign-up/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                没有账号? 注册
              </Link>
            </Box>
            {/* <Divider>or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => alert('Sign in with Google')}
                startIcon={<GoogleIcon />}
              >
                Sign in with Google
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => alert('Sign in with Facebook')}
                startIcon={<FacebookIcon />}
              >
                Sign in with Facebook
              </Button>
            </Box> */}
          </Card>
        </Stack>
      </SignInContainer>
      {/* <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      /> */}
    </ThemeProvider>
  );
}

//这个函数来指定如何把当前store state映射到展示组件的props中
const mapStateToProps = state => {
  return {
    userData : state.loginReducer,
  }
}

//接受dispatch()方法并返回期望注入到展示组件的props中的方法
const mapDispatchToProps = dispatch => {
  return{
    userDataFn : bindActionCreators(loginActionCreators, dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);