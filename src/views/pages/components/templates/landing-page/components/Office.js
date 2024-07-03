import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Chip as MuiChip } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';

const Chip = styled(MuiChip)(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        background:
          'linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))',
        color: 'hsl(0, 0%, 100%)',
        borderColor: theme.palette.primary.light,
        '& .MuiChip-label': {
          color: 'hsl(0, 0%, 100%)',
        },
        ...theme.applyStyles('dark', {
          borderColor: theme.palette.primary.dark,
        }),
      },
    },
  ],
}));


export default function Office(props) {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  
  if(props.data_list == null || props.data_list.length === 0 || props.right_list == null || props.right_list.length === 0){
    return;
  }
  const handleItemClick = (id) => {
    // <Route path="/detail/:num" element={<DetailPage />}></Route>

    window.location.href = `/details/${id}`
  };


  
  const data = props.data_list[0].data.articles;

  const left = data.slice(0, 5);
  const right = data.slice(5, 10);
  const left_selected_feature = left[selectedItemIndex];
  const right_selected_feature = left[selectedItemIndex];
  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 5 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          {/* <Grid container item sx={{ gap: 1, display: { xs: 'auto', sm: 'none' } }}>
            {items.map(({ title }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
                selected={selectedItemIndex === index}
              />
            ))}
          </Grid> */}
          <Card
            variant="outlined"
            sx={{ display: { xs: 'auto', sm: 'none' }, mt: 4 }}
          >
            <Box
              sx={(theme) => ({
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 280,
                backgroundImage: 'var(--items-imageLight)',
                ...theme.applyStyles('dark', {
                  backgroundImage: 'var(--items-imageDark)',
                }),
              })}
              style={{
                '--items-imageLight': left[selectedItemIndex].imageLight,
                '--items-imageDark': left[selectedItemIndex].imageDark,
              }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography
                gutterBottom
                sx={{ color: 'text.primary', fontWeight: 'medium' }}
              >
                {left_selected_feature.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
                {left_selected_feature.description}
              </Typography>
              <Link
                color="primary"
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  display: 'inline-flex',
                  alignItems: 'center',
                  '& > svg': { transition: '0.2s' },
                  '&:hover > svg': { transform: 'translateX(2px)' },
                }}
              >
                <span>Learn more</span>
                <ChevronRightRoundedIcon
                  fontSize="small"
                  sx={{ mt: '1px', ml: '2px' }}
                />
              </Link>
            </Box>
          </Card>
          
          <Stack
            direction="column"
            spacing={2}
            useFlexGap
            sx={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
            }}
          >

            { left.map(({ title, cotent, created_at, id}, index) =>{
              return (
                <Card
                  key={index}
                  component={Button}
                  onClick={() => handleItemClick(id)}
                  sx={[
                    (theme) => ({
                      p: 3,
                      height: 'fit-content',
                      width: '100%',
                      background: 'none',
                      '&:hover': {
                        background:
                          'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)',
                        borderColor: 'primary.light',
                        boxShadow: '0px 2px 8px hsla(0, 0%, 0%, 0.1)',
                        ...theme.applyStyles('dark', {
                          background:
                            'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
                          borderColor: 'primary.dark',
                          boxShadow: '0px 1px 8px hsla(210, 100%, 25%, 0.5) ',
                        }),
                      },
                    }),
                  ]}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      textAlign: 'left',
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: { md: 'center' },
                      gap: 2.5,
                    }}
                  >
                    <div>
                      <Typography
                        gutterBottom
                        sx={{ color: 'text.primary', fontWeight: 'medium' }}
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', mb: 1.5 }}
                      >
                        {cotent}
                      </Typography>
                      <Link
                        color="primary"
                        variant="body2"
                        onClick={() => handleItemClick(id)}
                        sx={{
                          fontWeight: 'bold',
                          display: 'inline-flex',
                          alignItems: 'center',
                          '& > svg': { transition: '0.2s' },
                          '&:hover > svg': { transform: 'translateX(2px)' },
                        }}
                      >
                        <span>详情访问</span>
                        <ChevronRightRoundedIcon
                          fontSize="small"
                          sx={{ mt: '1px', ml: '2px' }}
                        />
                      </Link>
                    </div>
                  </Box>
                </Card>
              )
            } )}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
        >
          <Card
            variant="outlined"
            sx={{ display: { xs: 'auto', sm: 'none' }, mt: 4 }}
          >
            <Box
              sx={(theme) => ({
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 280,
                backgroundImage: 'var(--items-imageLight)',
                ...theme.applyStyles('dark', {
                  backgroundImage: 'var(--items-imageDark)',
                }),
              })}
              style={{
                '--items-imageLight': right[selectedItemIndex].imageLight,
                '--items-imageDark': right[selectedItemIndex].imageDark,
              }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography
                gutterBottom
                sx={{ color: 'text.primary', fontWeight: 'medium' }}
              >
                {right_selected_feature.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
                {right_selected_feature.description}
              </Typography>
              <Link
                color="primary"
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  display: 'inline-flex',
                  alignItems: 'center',
                  '& > svg': { transition: '0.2s' },
                  '&:hover > svg': { transform: 'translateX(2px)' },
                }}
              >
                <span>Learn more</span>
                <ChevronRightRoundedIcon
                  fontSize="small"
                  sx={{ mt: '1px', ml: '2px' }}
                />
              </Link>
            </Box>
          </Card>
          
          <Stack
            direction="column"
            spacing={2}
            useFlexGap
            sx={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
            }}
          >

            { right.map(({ title, cotent, created_at, id }, index) =>{
              return (
                <Card
                  key={index}
                  component={Button}
                  onClick={() => handleItemClick(index)}
                  sx={[
                    (theme) => ({
                      p: 3,
                      height: 'fit-content',
                      width: '100%',
                      background: 'none',
                      '&:hover': {
                        background:
                          'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)',
                        borderColor: 'primary.light',
                        boxShadow: '0px 2px 8px hsla(0, 0%, 0%, 0.1)',
                        ...theme.applyStyles('dark', {
                          background:
                            'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
                          borderColor: 'primary.dark',
                          boxShadow: '0px 1px 8px hsla(210, 100%, 25%, 0.5) ',
                        }),
                      },
                    }),
                  ]}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      textAlign: 'left',
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: { md: 'center' },
                      gap: 2.5,
                    }}
                  >
                    <div>
                      <Typography
                        gutterBottom
                        sx={{ color: 'text.primary', fontWeight: 'medium' }}
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', mb: 1.5 }}
                      >
                        {cotent}
                      </Typography>
                      <Link
                        color="primary"
                        variant="body2"
                        onClick={() => handleItemClick(id)}
                        sx={{
                          fontWeight: 'bold',
                          display: 'inline-flex',
                          alignItems: 'center',
                          '& > svg': { transition: '0.2s' },
                          '&:hover > svg': { transform: 'translateX(2px)' },
                        }}
                      >
                        <span>详情访问</span>
                        <ChevronRightRoundedIcon
                          fontSize="small"
                          sx={{ mt: '1px', ml: '2px' }}
                        />
                      </Link>
                    </div>
                  </Box>
                </Card>
              )
            } )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

