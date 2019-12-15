import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { login } from '../../main/service/cas';

interface State {
  cip: string;
  password: string;
}

export default class Auth extends Component<{}, State> {
  static navigationOptions = {
    headerTitle: (
      <Image
        style={{
          alignSelf: 'center',
          width: 250,
          height: 80,
          flex: 1,
        }}
        resizeMode="contain"
        source={require('../../../assets/UdeS_signature.png')}
      />
    )
  };

  constructor(props: {}) {
    super(props);

    this.state = {
      cip: '',
      password: '',
    }
  }

  authCAS = () => {
    login(this.state.cip, this.state.password).then(res => {
        if (res) {
          // Todo persist cip and password
          // Todo navigate to home
        } else {
          // Todo enter valid cip and password
        }
      });
  };

  render() {
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

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  btn: {
    marginTop: 10,
  }
});