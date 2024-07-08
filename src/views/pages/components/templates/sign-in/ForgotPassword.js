import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import { message } from 'antd';

function ForgotPassword({ open, handleClose, handleSubmitForgetPwd }) {
  const [messageApi, contextHolder] = message.useMessage();
  const pwd_error = () => {
    messageApi.open({
      type: 'error',
      content: '两次输入的密码不一致',
    });
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: async (event) => {
          debugger;
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const confirm_new_password = data.get('confirm_new_password');
          if (confirm_new_password !== data.get('new_password')) {
            pwd_error();
            return;
          }
          const postParam = {
            username : data.get('username'),
            email : data.get('email'),
            new_password : data.get('new_password'),
          };
          handleSubmitForgetPwd(postParam);
        },
      }}
      // style={{
      //   height: '150px'
      // }}
    >
      {contextHolder}
      <DialogTitle>重置密码</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%'  }}
      >
        <DialogContentText>
         请输入一个新密码，并确认新密码。
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          type="text"
          fullWidth
        /> 
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="电子邮箱"
          placeholder="电子邮箱"
          type="email"
          fullWidth
        /> 
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="new_password"
          name="new_password"
          label="新密码"
          placeholder="新密码"
          type="password"
          fullWidth
        />
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="confirm_new_password"
          name="confirm_new_password"
          label="确认新密码"
          placeholder="确认新密码"
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>取消</Button>
        <Button variant="contained" type="submit">
          继续
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
