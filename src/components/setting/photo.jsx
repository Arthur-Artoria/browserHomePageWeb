import React from 'react';
import { Paper, CircularProgress } from '@material-ui/core';

export const Photo = props => {
  const { progress, photo, percent } = props;

  return (
    <>
      <Paper className="photo-item__inner flex-center">
        <CircularProgress variant="static" value={Math.round(percent)} />
      </Paper>
    </>
  );
};
