import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Auth from '../../auth/container/Auth';

const AppNavigator = createStackNavigator({
  Auth: {
    screen: Auth,
  },
});

export default createAppContainer(AppNavigator);