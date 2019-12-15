import React from 'react';
import AppNavigator from './src/main/navigation/AppNavigator';
import { Provider } from 'react-native-paper';
import Theme from './src/main/styles/theme';

export default function App() {
  return (
    <Provider theme={Theme}>
      <AppNavigator />
    </Provider>
  );
}
