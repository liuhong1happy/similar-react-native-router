import React from 'react';
import { SystemContainer } from '../base/system-container';

const UserView = props => <SystemContainer>{props.children}</SystemContainer>;

module.exports = UserView;
