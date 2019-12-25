import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {isConnected, login} from '../../main/service/cas';
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import {Credentials, save} from "../../main/persistence/credentials";

class Auth extends Component<NavigationInjectedProps, Credentials> {
  // static navigationOptions = {
  //   headerTitle: (
  //     <Image
  //       style={{
  //         alignSelf: 'center',
  //         width: 250,
  //         height: 80,
  //         flex: 1,
  //       }}
  //       resizeMode="contain"
  //       source={require('../../../assets/UdeS_signature.png')}
  //     />
  //   )
  // };

  constructor(props: NavigationInjectedProps) {
    super(props);

    this.state = {
      cip: '',
      password: '',
    }
  }

  authCAS = () => {
    // login(this.state.cip, this.state.password).then(async res => {
    //   console.log(res);
    //   if (res) {
    //       const success = await save(this.state);
    //       // Todo check if save worked
    //       this.props.navigation.navigate('TabNavigator');
    //     } else {
    //       // Todo enter valid cip and password
    //     }
    //   });
    this.props.navigation.navigate('TabNavigator');
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

export default withNavigation(Auth);