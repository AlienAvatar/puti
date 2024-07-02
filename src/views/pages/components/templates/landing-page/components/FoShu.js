import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import DOMPurify from 'dompurify';
import { Card } from 'antd';
const { Meta } = Card;

export default function FoShuList(props) {
    if(props.data_list == null || props.data_list.length === 0) return null;

    const data = props.data_list[0].data.articles.slice(0, 6);

    return (
        <Container id="features" sx={{ py: { xs: 12, sm: 5 } }}>
            <Grid container spacing={0} >
                <List
                size="large"
                dataSource={data}
                header={
                    <h3>
                        佛书法著
                    </h3>
                }
                grid={{
                    gutter: 1,
                    column: 6,
                }}
                renderItem={(item) => {
                    console.log('foshu', item)
                    return (
                        <List.Item 
                        // extra={
                        //     <img
                        //     width={272}
                        //     alt="logo"
                        //     src={item.cover_img}
                        //     />
                        // }
                        >
                            
                            <Card
                                title={item.title}
                                hoverable
                                style={{ width: 150 }}
                                cover={<img alt={item.title} src={item.cover_img} />}
                            >
                                {/* <img src={item.cover_img} /> */}
                            </Card>
                        </List.Item>
                    )
                }}
                />
               
            </Grid>
        </Container>
    );
}