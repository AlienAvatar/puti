import React from 'react';
// import { makeStyles } from '@mui/styles';
import { Divider, List, Typography, Avatar, Space, Button } from 'antd';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { LikeOutlined, MessageOutlined, StarOutlined, ProfileOutlined } from '@ant-design/icons';
import BG_IMG from '../../../../assets/main/bg_brick.jpg'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     maxWidth: 752,
//   },
//   demo: {
//     backgroundColor: theme.palette.background.paper,
//   },
//   title: {
//     margin: theme.spacing(4, 0, 2),
//   },
// }));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const listClickHandle = (item) => {
  const id = item.id;
  window.location.href = `${id}`;
}

export default function InteractiveList(props) {
  //const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  if(props.left_list == null || props.left_list.length === 0 || props.right_list == null || props.right_list.length === 0){
    return;
  }

  const left_data = props.left_list[0].data.articles;
  const right_data = props.right_list[0].data.articles;
  const left_title = props.left_title;
  const right_title = props.right_title;
  const left_href = props.left_href;
  const right_href = props.right_href;
  return (
    <Container id="features" sx={{ py: { xs: 1, sm: 5 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
            <List
                header={<h3><ProfileOutlined /> {left_title}</h3>}
                bordered
                dataSource={left_data}
                style={{ backgroundColor: '#fff'}}
                renderItem={(item) => {
                    const dateTimeString = item.created_at;
                    const dateString = dateTimeString.split('T')[0];
                    return (
                    <List.Item>
                        <Button type="text" onClick={() => listClickHandle(item)}><Typography.Text> {item.title}</Typography.Text></Button>
                        <div>{dateString}</div>
                    </List.Item>
                    )}  
                } 
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <List
                header={<h3><ProfileOutlined /> {right_title}</h3>}
                bordered
                dataSource={right_data}
                style={{ backgroundColor: '#fff'}}
                renderItem={(item) =>{
                    const dateTimeString = item.created_at;
                    const dateString = dateTimeString.split('T')[0];
                    return (
                    <List.Item>
                         <Button type="text" onClick={() => listClickHandle(item)}><Typography.Text> {item.title}</Typography.Text></Button>
                        <div>{dateString}</div>
                    </List.Item>
                    )}  
                } 
            />
        </Grid>
      </Grid>
    </Container>
  );
}
