import React from 'react';
import { LikeOutlined, TeamOutlined, ProfileOutlined } from '@ant-design/icons';
import { List, Space, Button, Typography } from 'antd';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import DOMPurify from 'dompurify';

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
);

const listClickHandle = (item) => {
const id = item.id;
window.location.href = `${id}`;
}
const createMarkup = (html) => {
    return {
        __html : DOMPurify.sanitize(html)
    }
};
export default function MobileImgList(props) {

    if(props.data_list == null || props.data_list.length === 0) return null;

    const data = props.data_list[0].data.articles.slice(0, 6);
    const href = props.href;
    return (
        <Container id="features" sx={{ py: { xs: 1, sm: 5 } }}>
            <Grid container spacing={6}>
            <Grid item xs={12} md={12}>
                <List
                itemLayout="vertical"
                size="large"
                dataSource={data}
                header={ <h3><Button type="text" style={{fontSize: 'medium'}} href={href}><ProfileOutlined /> 受用分享</Button></h3> }
                style={{ backgroundColor: '#fff', borderRadius: 10, padding: 20 }}
                renderItem={(item, index) => {
                    const convertedHTML = <div 
                                            style={{
                                                    maxWidth: '53em',
                                                    height: '8em',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                            }}
                                            dangerouslySetInnerHTML={createMarkup(item.content)}>
                                        </div>
                   
                    return (
                        <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={TeamOutlined} text={item.views_count} key="list-vertical-star-o" />,
                            <IconText icon={LikeOutlined} text={item.support_count} key="list-vertical-like-o" />,
                            // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                        // extra={
                        //     <img
                        //     width={272}
                        //     alt="logo"
                        //     src={item.cover_img}
                        //     />
                        // }
                        style={ index === 5 ? { borderBottom: '' } : { borderBottom: '1px solid #7c7c7c' } }
                        >
                        <List.Item.Meta
                            title={<Button type="link" style={{ whiteSpace: "normal", textAlign: "left" }} onClick={() => listClickHandle(item)}><Typography.Text> {item.title} </Typography.Text></Button>}
                        />
                            {/* 将html去标签 */}
                            {convertedHTML}
                        </List.Item>
                    )
                }}
                />
                </Grid>
            </Grid>
        </Container>
    );
}