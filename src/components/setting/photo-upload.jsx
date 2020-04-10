import React from 'react';
import { Typography } from '@material-ui/core';
import { Upload, message } from 'antd';
import { generateUUID } from '../../assets/js/tools';
import BackupRoundedIcon from '@material-ui/icons/BackupRounded';

const { Dragger } = Upload;

export const PhotoUpload = props => {
  /**
   * * 设置上传所需额外数据
   * @param {object} file 上传文件信息
   */
  const setUpdateData = file => {
    const { name } = file;
    return { fileName: `/background/${generateUUID()}${name}` };
  };

  /**
   * * 上传之前的回调
   * @param {object} file 上传文件信息
   */
  const handleBeforeUpload = file => {
    const { type, size } = file;
    const isJpgOrPng = type === 'image/jpeg' || type === 'image/png';
    if (!isJpgOrPng) message.error('你只能上传 JPG/PNG 格式的图片！');
    const isLt2M = size / 1024 / 1024 < 2;
    if (!isLt2M) message.error('图片大小不得超过 2M ！');
    return isJpgOrPng && isLt2M;
  };

  /**
   * * 上传状态更改回调
   * @param {object} info 上传回调信息
   */
  const handleUpdateChange = info => {
    const {
      event,
      file: { response, status }
    } = info;

    if (!event && !response) props.onUploadBegin(info);

    formatUpdateEvent(info);
    if (status === 'done') handleUploadSuccess(response);
  };

  /**
   * * 处理图片上传事件
   * @param {object} info 上传信息
   */
  const formatUpdateEvent = info => {
    const { event = {} } = info;
    const { type } = event;
    if (type !== 'progress') return;
    props.onProgressChange(info);
  };

  /**
   * * 图片上传成功回调
   * @param {object} response 上传成功返回信息
   */
  const handleUploadSuccess = ({ name, img }) => {
    console.log(name, img);
  };

  return (
    <Dragger
      name="file"
      multiple={true}
      data={setUpdateData}
      showUploadList={false}
      onChange={handleUpdateChange}
      className="photo-item__upload"
      beforeUpload={handleBeforeUpload}
      action={`${process.env.REACT_APP_API_HOST}/oss/upload`}>
      <BackupRoundedIcon className="upload-svg" />
      <Typography className="upload-tip" variant="body1" gutterBottom>
        将图片拖拽至此即可上传
      </Typography>
    </Dragger>
  );
};
