import React from 'react';
import './login.scss';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions
} from '@material-ui/core';
import { Login } from '../../assets/js/api';
import { message } from 'antd';
import { connect } from 'react-redux';

const _LoginModalHook = props => {
  const { visible, onVisibleChange } = props;
  const { handleSubmit, register, errors } = useForm();

  /**
   * * 关闭对话框
   */
  const handleClose = () => onVisibleChange(false);

  /**
   * * 登录
   * @param {object} formData 登录数据
   */
  function login({ username, password }) {
    Login(username, password).then(({ access_token }) => {
      message.success('登录成功！');
      localStorage.setItem('access_token', access_token);
      props.dispatch({ type: 'SET_TOKEN', payload: access_token });
      handleClose();
    });
  }

  return (
    <Dialog id="login" open={visible} aria-labelledby="form-dialog-title">
      <DialogTitle>登录</DialogTitle>
      <form onSubmit={handleSubmit(login)}>
        <DialogContent className="dialog-content">
          <TextField
            fullWidth
            label="用户名"
            name="username"
            margin="normal"
            error={!!errors.username}
            inputRef={register({ required: true })}
            helperText={errors.username && '用户名不得为空！'}
          />
          <TextField
            fullWidth
            label="密码"
            type="password"
            name="password"
            margin="normal"
            error={!!errors.password}
            inputRef={register({ required: true })}
            helperText={errors.password && '密码不得为空！'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button type="submit" color="primary">
            登录
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export const LoginModalHook = connect()(_LoginModalHook);
