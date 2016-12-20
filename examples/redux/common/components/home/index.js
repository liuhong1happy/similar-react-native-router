import React from 'react';

const { SystemContainer } = require('../base/system-container');

const HomeView = props =>
  <SystemContainer>
    {props.children}
  </SystemContainer>;

module.exports = HomeView;
