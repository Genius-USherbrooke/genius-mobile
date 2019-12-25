import React, { Component } from 'react';
import { View, FlatList, Text } from "react-native";
import { Competency, fetchCompetencies, fetchTrimesters, Trimester } from "../../main/service/gel";

interface State {
  trimesters: Trimester[];
  competencies: Competency[];
}

export default class Home extends Component<{}, State> {

  constructor(props) {
    super(props);

    this.state = {
      trimesters: [],
      competencies: []
    };

    this.fetchTrimesters();
  }

  fetchTrimesters = () => {
    fetchTrimesters().then(trimesters => this.setState({ trimesters }))
  };

  fetchCompetencies = (trimester: string, profil: string) => {
    fetchCompetencies(trimester, profil).then(competencies => this.setState({ competencies }));
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.trimesters}
          renderItem={({item}) =>
            <Text onPress={() => this.fetchCompetencies(item.id, item.profiles[0].id)}>{item.id}</Text>
          }
        />
        <FlatList
          data={this.state.competencies}
          renderItem={({item}) =>
            <Text>{item.id}</Text>
          }
        />
      </View>
    )
  }
}