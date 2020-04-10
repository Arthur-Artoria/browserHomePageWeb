import React, { useState } from 'react';
import './photo-list.scss';
import { GridList, GridListTile } from '@material-ui/core';
import { PhotoUpload } from './photo-upload';
import { Photo } from './photo';

export const PhotoList = props => {
  const [photos, setPhotos] = useState([]);

  /**
   * * 文件上传开始回调
   * @param {object} info 上传信息
   * @param {any[]} info.fileList 上传文件列表
   */
  const handleUploadBegin = ({ fileList }) => {
    setPhotos(fileList);
  };

  /**
   * * 上传进度改变回调
   * @param {object} info 上传文件列表
   * @param {any[]} info.fileList 上传文件列表
   */
  const handleProgressChange = ({ fileList }) => {
    setPhotos(fileList.map(({ uid, percent }) => ({ uid, percent })));
  };

  /**
   * * 渲染图片列表
   * @param {any[]} photos 图片数组
   */
  const renderPhotos = photos => {
    return photos.map(({ uid, name, percent, src }) => (
      <GridListTile className="photo-item" key={name || uid}>
        <Photo photo={src} percent={percent} />
      </GridListTile>
    ));
  };

  return (
    <GridList
      className="setting-photo photo-list"
      cellHeight={226}
      cols={5}
      spacing={20}>
      {renderPhotos(photos)}
      {/* <GridListTile className="photo-item" key="test">
        <Photo progress={20} />
      </GridListTile> */}
      <GridListTile key="upload" className="photo-item">
        <PhotoUpload
          onUploadBegin={handleUploadBegin}
          onProgressChange={handleProgressChange}
        />
      </GridListTile>
    </GridList>
  );
};
