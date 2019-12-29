import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Auth from '../../auth/container/Auth';
import Home from '../../home/container/Home';
import Chart from '../../chart/container/Chart';
import { isConnected, login } from "../service/cas";
import { get } from "../persistence/credentials";
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

// Todo if user persisted, default screen is home or else it is auth
// async function initialRoute(): Promise<string> {
//   let connected = await isConnected();
//
//   if (connected) {
//     return 'TabNavigator';
//   } else {
//     const credentials = await get();
//
//     if (credentials !== null) {
//       connected = await login(credentials.cip, credentials.password);
//
//       if (connected)
//         return 'TabNavigator';
//     }
//   }
//
//   return 'Auth';
// }

const AppNavigator = createSwitchNavigator({
  Auth: { screen: Auth },
  TabNavigator: { screen: BottomTabNavigator },
}, {
  initialRouteName: 'Auth',
});

export default createAppContainer(AppNavigator);