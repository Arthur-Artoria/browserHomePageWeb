import React from 'react';
import { PhotoList } from '../../components/setting/photo-list';
import { Container } from '@material-ui/core';
import './index.scss';
export const Setting = props => {
  document.title = 'Avalon - Setting';
  return (
    <Container id="setting" maxWidth="lg">
      <PhotoList></PhotoList>
    </Container>
  );
};
