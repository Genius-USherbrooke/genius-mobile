import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import {Credentials, get, save} from "../../main/persistence/credentials";
import {isConnected, login} from "../../main/service/cas";

interface State extends Credentials {
  check: boolean;
}

class Auth extends Component<NavigationInjectedProps, State> {

  constructor(props: NavigationInjectedProps) {
    super(props);

    this.state = {
      cip: '',
      password: '',
      check: false
    };

    this.checkCredentials();
  }

  navigateToHome = () => this.props.navigation.navigate('TabNavigator');

  authCAS = async () => {
    const connected = await login(this.state.cip, this.state.password);

    if (connected) {
      const success = await save(this.state);
      if (!success)
        console.log('save error');

      this.navigateToHome()
    }
  };

  checkCredentials = async () => {
    let connected = await isConnected();

    if (connected) {
      this.navigateToHome();
      return;
    } else {
      const credentials = await get();

      if (credentials !== null) {
        connected = await login(credentials.cip, credentials.password);

        if (connected) {
          this.navigateToHome();
          return;
        }
      }
    }

    this.setState({ check: true })
  };

  render() {
    if (!this.state.check) {
      return null
    } else {
      return (
        <View style={styles.container}>
          <TextInput
            label="cip"
            mode="outlined"
            value={this.state.cip}
            onChangeText={cip => this.setState({ cip })}
          />
          <TextInput
            label="password"
            mode="outlined"
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <Button
            style={styles.btn}
            mode="contained"
            dark
            onPress={this.authCAS}
          >
            Login
          </Button>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  btn: {
    marginTop: 10,
  }
});

export default withNavigation(Auth);