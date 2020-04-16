import React from 'react';
import {
  Paper,
  CircularProgress,
  GridListTileBar,
  IconButton
} from '@material-ui/core';

import { Delete } from '@material-ui/icons';
import { DeletePhoto } from '../../assets/js/api';
import { useDispatch } from 'react-redux';

export const Photo = props => {
  const { photo, percent } = props;
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    const { id } = props;
    if (!id) return;
    DeletePhoto(id).then(res => {
      dispatch({
        type: 'DELETE_PHOTO',
        payload: id
      });
    });
  };

  return (
    <>
      <Paper className="photo-item__inner flex-center img-container">
        {props.photo ? (
          <img alt="" src={photo} className="img photo-item__cover" />
        ) : (
          <CircularProgress variant="static" value={Math.round(percent)} />
        )}
      </Paper>
      <GridListTileBar
        actionIcon={
          <IconButton onClick={handleDeleteClick} className="photo-bar__icon">
            <Delete />
          </IconButton>
        }
      />
    </>
  );
};
