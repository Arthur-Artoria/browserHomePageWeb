import React from 'react';
import { GridList, GridListTile } from '@material-ui/core';
import { Upload, message } from 'antd';
import { generateUUID } from '../../assets/js/tools';

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
    <GridList cellHeight="160" cols={3}>
      <GridListTile>
        <Upload
          name="file"
          showUploadList={false}
          data={setUpdateData}
          onChange={handleUpdateChange}
          beforeUpload={handleBeforeUpload}
          action={`${process.env.REACT_APP_API_HOST}/oss/upload`}></Upload>
      </GridListTile>
    </GridList>
  );
};
