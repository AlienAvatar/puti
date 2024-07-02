import React from 'react';
// import { makeStyles } from '@mui/styles';
import { Divider, List, Typography, Avatar, Space } from 'antd';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
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

const handleListItemClick = (event, id) => {

};

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
  
  return (
    <Container id="features" sx={{ py: { xs: 1, sm: 5 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
            <List
                header={<h3>{left_title}</h3>}
                bordered
                dataSource={left_data}
                renderItem={(item) =>{
                    const dateTimeString = item.created_at;
                    const dateString = dateTimeString.split('T')[0];
                    return (
                    <List.Item>
                        <Typography.Text> {item.title}</Typography.Text>
                        <div>{dateString}</div>
                    </List.Item>
                    )}  
                } 
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <List
                header={<h3>{right_title}</h3>}
                bordered
                dataSource={right_data}
                renderItem={(item) =>{
                    const dateTimeString = item.created_at;
                    const dateString = dateTimeString.split('T')[0];
                    return (
                    <List.Item>
                        <Typography.Text> {item.title}</Typography.Text>
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

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

export function ImgList(props) {
  const { item } = props;
  const data = props.data_list;

  return (
    <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={data}
    footer={
      <div>
        <b>ant design</b> footer part
      </div>
    }
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
  );
}