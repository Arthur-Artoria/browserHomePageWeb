import React, { Component } from 'react';
import { Button, Popover } from 'antd';

export class Bookmark extends Component {
  render() {
    const { bookmark } = this.props;
    const { name, href } = bookmark;
    return (
      <Popover content={name} className="bookmark">
        <Button
          href={href}
          size="large"
          target="blank"
          shape="circle"
          className="bookmark-cover">
          {name.slice(0, 1)}
        </Button>
      </Popover>
    );
  }
}
