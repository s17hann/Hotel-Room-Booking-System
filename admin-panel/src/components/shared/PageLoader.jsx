/**
 * @name Hotel Room Booking System
 * @author Shihan
 * @description Hotel Room Booking and Management System Software ~ Developed By Shihan
 * @copyright ©2023 ― Shihan. All rights reserved.
 * @version v0.0.1
 *
 */

import { Layout, Spin } from 'antd';
import React from 'react';

const { Content } = Layout;

function PageLoader() {
  return (
    <Content className='page-loader'>
      <Spin
        size='large'
        tip='Loading...'
      />
    </Content>
  );
}

export default PageLoader;
