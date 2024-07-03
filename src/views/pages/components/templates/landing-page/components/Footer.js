import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { visuallyHidden } from '@mui/utils';

import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';

import SitemarkIcon from './SitemarkIcon';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: '#ccc', mt: 1 }}>
      {'Copyright © '}
      { '菩提道行版权所有'}&nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <SitemarkIcon />
            <Typography variant="body2" gutterBottom sx={{ color: '#ccc', fontWeight: 600, mt: 2 }}>
              关于本站
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc', mb: 2 }}>
              本站创办宗旨是为了让更多的人了解、学习南无第三世多杰羌佛和南无释迦牟尼佛的佛法，修行解脱，利益大众，国泰民安，世界和平。
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {/* <Link color="#ccc" variant="body2" href="#">
            Features
          </Link> */}
          <Link color="#ccc" variant="body2" href="#">
            羌佛说法
          </Link>
          <Link color="#ccc" variant="body2" href="#">
            羌佛圣量
          </Link>
          <Link color="#ccc" variant="body2" href="#">
            妙谙五明
          </Link>
          <Link color="#ccc" variant="body2" href="#">
            正法新闻
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Link color="#ccc" variant="body2" href="#">
            古佛降世
          </Link>
          <Link color="#ccc" variant="body2" href="#">
            圆满佛格
          </Link>
          <Link color="#ccc" variant="body2" href="#">
            渡生成就
          </Link>
          <Link color="#ccc" variant="body2" href="#">
            圣德答复
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Link color="#ccc" variant="body2" href="#">
            认证恭贺
          </Link>
          <Link color="#ccc" variant="body2" href="#">
            羌佛圣迹
          </Link>
          <Link color="#ccc" variant="body2" href="#">
            摧邪显正
          </Link>
          <Link color="#ccc" variant="body2" href="#">
            大德文集
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Copyright />
        </div>
        {/* <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: 'left', color: '#ccc' }}
        >
          <IconButton
            color="inherit"
            href="https://github.com/mui"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://x.com/MaterialUI"
            aria-label="X"
            sx={{ alignSelf: 'center' }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.linkedin.com/company/mui/"
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack> */}
      </Box>
    </Container>
  );
}
