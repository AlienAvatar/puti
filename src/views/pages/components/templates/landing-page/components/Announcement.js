import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Chip as MuiChip } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Divider, List, Typography, Button } from 'antd';
import { styled } from '@mui/material/styles';
import { ProfileOutlined } from '@ant-design/icons';

const listClickHandle = (item) => {
  const id = item.id;
  window.location.href = `${id}`;
}

export default function Announcement(props) {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  
  if(props.data_list == null || props.data_list.length === 0){
    return;
  }
  const handleItemClick = (id) => {
    // <Route path="/detail/:num" element={<DetailPage />}></Route>

    window.location.href = `/details/${id}`
  };

  const data = props.data_list[0].data.articles;
  const title = props.title;
  const href = props.href;
  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 5 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
            <List
                size="small"
                header={ <h3><Button type="text" style={{fontSize: 'medium'}} href={href}><ProfileOutlined /> {title}</Button></h3> }
                bordered
                dataSource={data}
                style={{ backgroundColor: '#fff'}}
                renderItem={(item) => {
                    const dateTimeString = item.created_at;
                    const dateString = dateTimeString.split('T')[0];
                    return (
                        <List.Item
                            style={{display: 'flex', justifyContent:'space-between'}}
                        ><Button style={{ whiteSpace: "normal", textAlign: "left" }} type="text" onClick={() => listClickHandle(item)}><Typography.Text> {item.title}</Typography.Text></Button> <p>{dateString}</p></List.Item>
                    )
                }}
            />
        </Grid>
      </Grid>
    </Container>
  );
}

