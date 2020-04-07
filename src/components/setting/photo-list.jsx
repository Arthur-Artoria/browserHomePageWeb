import React from 'react';
import './photo-list.scss';
import { GridList, GridListTile, Typography } from '@material-ui/core';
import { Upload, message } from 'antd';
import { generateUUID } from '../../assets/js/tools';
import BackupRoundedIcon from '@material-ui/icons/BackupRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

const { Dragger } = Upload;

export const PhotoList = props => {
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
   */
  const handleUpdateChange = info => {
    const {
      file: { response, status }
    } = info;
    if (status === 'done') {
      const { name, img } = response;
    }
  };

  return (
    <GridList
      className="setting-photo photo-list"
      cellHeight={226}
      cols={5}
      spacing={20}>
      <GridListTile className="photo-item">
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
      </GridListTile>
    </GridList>
  );
};
