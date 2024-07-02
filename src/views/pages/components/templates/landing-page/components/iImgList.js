import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {
    RichTextField,
} from 'react-admin';
import DOMPurify from 'dompurify';

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

const createMarkup = (html) => {
    return {
        __html : DOMPurify.sanitize(html)
    }
};
export default function ImgList(props) {

    if(props.data_list == null || props.data_list.length === 0) return null;

    const data = props.data_list[0].data.articles.slice(0, 6);
    return (
        <Container id="features" sx={{ py: { xs: 1, sm: 5 } }}>
            <Grid container spacing={6}>
            <Grid item xs={12} md={12}>
                <List
                itemLayout="vertical"
                size="large"
                dataSource={data}
                header={
                    <h3>
                        共用分享
                    </h3>
                }
                renderItem={(item) => {
                    console.log(item);
                    const convertedHTML = <div 
                                            style={{
                                                    maxWidth: '50em',
                                                    maxHeight: '10em',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
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
                        extra={
                            <img
                            width={272}
                            alt="logo"
                            src={item.cover_img}
                            />
                        }
                        >
                        <List.Item.Meta
                            title={<a>{item.title}</a>}
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