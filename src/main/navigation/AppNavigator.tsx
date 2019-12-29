import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Auth from '../../auth/container/Auth';
import Home from '../../home/container/Home';
import Chart from '../../chart/container/Chart';
import Competency from "../../home/container/Competency";

const HomeStack = createSwitchNavigator({
  Home: { screen: Home },
  Competency: { screen: Competency }
}, {
  initialRouteName: 'Home'
});

const BottomTabNavigator = createMaterialBottomTabNavigator({
  HomeStack: { screen: HomeStack },
  Chart: { screen: Chart },
}, {
  initialRouteName: 'HomeStack',
});

const AppNavigator = createSwitchNavigator({
  Auth: { screen: Auth },
  TabNavigator: { screen: BottomTabNavigator },
}, {
  initialRouteName: 'Auth',
});

export default createAppContainer(AppNavigator);