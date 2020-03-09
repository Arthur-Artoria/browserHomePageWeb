import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Users extends Component {
  render() {
    return (
      <div>
        <h1>用户</h1>
        <Link to="/">去往首页</Link>
      </div>
    );
  }
}

export default Users;
