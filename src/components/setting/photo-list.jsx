import React, { useState, useEffect } from 'react';
import './photo-list.scss';
import { GridList, GridListTile } from '@material-ui/core';
import { PhotoUpload } from './photo-upload';
import { Photo } from './photo';
import { useSelector } from 'react-redux';

export const PhotoList = props => {
  const [photos, setPhotos] = useState([]);
  const statePhotos = useSelector(state => state.photos);

  useEffect(() => {
    let isInit = true;
    isInit && setPhotos(statePhotos);
    // return () => {
    //   isInit = false;
    // };
  }, [statePhotos]);

  /**
   * * 上传进度改变回调
   * @param {object} info 上传文件列表
   * @param {any[]} info.fileList 上传文件列表
   */
  const handleProgressChange = ({ fileList }) => {
    setPhotos([
      ...fileList.map(({ uid, percent, response = {} }) => {
        const { img } = response;
        return { uid, percent, name: img };
      }),
      ...statePhotos
    ]);
  };

  /**
   * * 渲染图片列表
   * @param {any[]} photos 图片数组
   */
  const renderPhotos = photos => {
    return photos.map(({ id, uid, name, percent, thumb }) => (
      <GridListTile className="photo-item" key={name || uid}>
        <Photo id={id} photo={thumb} percent={percent} />
      </GridListTile>
    ));
  };

  return (
    <GridList
      className="setting-photo photo-list"
      cellHeight={224}
      cols={5}
      spacing={20}>
      {renderPhotos(photos)}
      <GridListTile key="upload" className="photo-item">
        <PhotoUpload onProgressChange={handleProgressChange} />
      </GridListTile>
    </GridList>
  );
};
