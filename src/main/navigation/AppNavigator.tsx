import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Auth from '../../auth/container/Auth';
import Home from '../../home/container/Home';
import Chart from '../../chart/container/Chart';

// Todo if user persisted, default screen is home or else it is auth
// const AppNavigator = createStackNavigator({
//   Auth: {
//     screen: Auth,
//   },
//   Home: {
//     screen: Home,
//   },
//   Chart: {
//     screen: Chart,
//   },
// });

const asd = createMaterialBottomTabNavigator(
  {
    Home: { screen: Home },
    Chart: { screen: Chart },
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(asd);