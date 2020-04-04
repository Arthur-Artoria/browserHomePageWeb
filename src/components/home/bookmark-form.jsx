import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';

export const BookmarkForm = props => {
  const { handleSubmit, register, errors, control } = useForm();
  const onSubmit = data => console.log(data);

  const { name, href } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="name"
        label="书签名称"
        defaultValue={name}
        error={!!errors.name}
        inputRef={register({ required: true })}
        helperText={errors.name && '书签名称不得为空！'}
      />
      <TextField
        name="href"
        label="书签链接"
        defaultValue={href}
        error={!!errors.href}
        inputRef={register({ required: true })}
        helperText={errors.href && '书签链接不得为空！'}
      />
      <input type="submit" />
    </form>
  );
};
