import React from 'react';
import { Avatar,Card } from 'antd';
import { EditOutlined,EllipsisOutlined,SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default function ArtCard({ className }) {
    return (
        <Card
            hoverable
            style={{ margin: '32px 20px 0px 0px', width: 750,display:'flex' }}
            //cover 卡片封面
            cover={
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            }
            actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta
            avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
            title="Card title"
            description="This is the description"
            />
         </Card>
    )
}