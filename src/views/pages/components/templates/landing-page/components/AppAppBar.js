import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ToggleColorMode from './ToggleColorMode';
import IsLoginContext from "../../../../common/Global"
import Sitemark from './SitemarkIcon';
import Avatar from '@mui/material/Avatar';
import { TextField, Menu  } from '@mui/material';
// import { deepOrange, deepPurple } from '@material-ui/core/colors';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   orange: {
//     color: theme.palette.getContrastText(deepOrange[500]),
//     backgroundColor: deepOrange[500],
//   },
//   purple: {
//     color: theme.palette.getContrastText(deepPurple[500]),
//     backgroundColor: deepPurple[500],
//   },
// }));

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  //const classes = useStyles();
  // console.log('IsLoginContext', IsLoginContext);

  let token = localStorage.getItem('token');
  //console.log('is_login', is_login);
  let is_login = false;
  if(token){
    is_login = true;
  }

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //登出
  const handleAvatarClose = () => {
    setAnchorEl(null);
    is_login = false;
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  const titleClickHandle = (value) =>{
      console.log('value', value);
      window.location.href = `/${value}`;
  }

  return (
    <AppBar
      position="fixed"
      sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 2 }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '999px',
            backdropFilter: 'blur(24px)',
            maxHeight: 40,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'hsla(220, 60%, 99%, 0.6)',
            boxShadow:
              '0 1px 2px hsla(210, 0%, 0%, 0.05), 0 2px 12px hsla(210, 100%, 80%, 0.5)',
            ...theme.applyStyles('dark', {
              bgcolor: 'hsla(220, 0%, 0%, 0.7)',
              boxShadow:
                '0 1px 2px hsla(210, 0%, 0%, 0.5), 0 2px 12px hsla(210, 100%, 25%, 0.3)',
            }),
          })}
        >
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Sitemark />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => titleClickHandle('buddha')}
              >
                古佛降世
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => titleClickHandle('buddha_dharma')}
              >
                羌佛说法
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => titleClickHandle('office')}
              >
                羌佛公告
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => titleClickHandle('recognition')}
              >
                认证恭贺
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => titleClickHandle('holy_realization')}
                sx={{ minWidth: 0 }}
              >
                羌佛圣量
              </Button> 
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => titleClickHandle('holy_occurrences')}
                sx={{ minWidth: 0 }}
              >
                羌佛圣迹
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => titleClickHandle('buddha_virtue')}
                sx={{ minWidth: 0 }}
              >
                圆满佛格
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => titleClickHandle('wuming')}
                sx={{ minWidth: 0 }}
              >
                妙谙五明
              </Button>
               <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => titleClickHandle('savelivingbings')}
                sx={{ minWidth: 0 }}
              >
                渡生成就
              </Button>
              
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
            {is_login ? 
              <>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleAvatarClick}>
                  <Avatar alt={localStorage.getItem('nickname')} >
                    {localStorage.getItem('nickname').slice(0,1)}
                  </Avatar>
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleAvatarClose}
                >
                  <MenuItem onClick={handleAvatarClose}>登出</MenuItem>
                </Menu>
              </>
            : <>
                <Button color="primary" variant="text" size="small" onClick={() => titleClickHandle('signin')}>
                  登录
                </Button>
                <Button color="primary" variant="contained" size="small" onClick={() => titleClickHandle('signup')}>
                  注册
                </Button>
              </>
            }
          </Box>
          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem onClick={() => titleClickHandle('buddha')}>
                  古佛降世
                </MenuItem>
                <MenuItem onClick={() => titleClickHandle('buddha_dharma')}>
                  羌佛说法
                </MenuItem>
                <MenuItem onClick={() => titleClickHandle('office')}>
                  羌佛公告
                </MenuItem>
                <MenuItem onClick={() => titleClickHandle('recognition')}>
                  认证恭贺
                </MenuItem>
                <MenuItem onClick={() => titleClickHandle('holy_realization')}>
                  羌佛圣量
                </MenuItem>
                <MenuItem onClick={() => titleClickHandle('holy_occurrences')}>
                  羌佛圣迹
                </MenuItem>
                <MenuItem onClick={() => titleClickHandle('buddha_virtue')}>圆满佛格</MenuItem>
                <MenuItem onClick={() => titleClickHandle('wuming')}>妙谙五明</MenuItem>
                <MenuItem onClick={() => titleClickHandle('savelivingbings')}>渡生成就</MenuItem>
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth onClick={() => titleClickHandle('signup')}>
                    注册
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth onClick={() => titleClickHandle('signin')}>
                    登录
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
