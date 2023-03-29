import {
    BorderBottomOutlined,
    BorderTopOutlined,
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined,
    RadiusUpleftOutlined,
    RadiusUprightOutlined,
  } from '@ant-design/icons';
  import { Button, Divider, Space, notification } from 'antd';

  function Notification(props){
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message) => {
      api.info({
        message: `${message}`,
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        top:24
      });
    };

    return (
      <>
        {contextHolder}
      </>
    );
  };

  export default Notification;