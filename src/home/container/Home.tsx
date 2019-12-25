import React, { Component } from 'react';
import { View, FlatList } from "react-native";
import { Card, Title, Text } from 'react-native-paper';
import { Competency, fetchCompetencies, fetchTrimesters, Trimester } from "../../main/service/gel";
import { TabView, SceneMap } from 'react-native-tab-view';
import {getGrade, Grade} from "../../main/utils/conversionTable";

interface State {
  navIndex: number;
  trimesters: Trimester[];
  competencies: Competency[];
}

export default class Home extends Component<{}, State> {

  constructor(props) {
    super(props);

    this.state = {
      navIndex: 0,
      trimesters: [],
      competencies: []
    };

    this.fetchTrimesters();
  }

  setIndex = (index: number) => this.setState({ navIndex: index });

  fetchTrimesters = () => {
    fetchTrimesters().then(trimesters => this.setState({ trimesters }))
  };

  fetchCompetencies = (trimester: string, profil: string) => {
    fetchCompetencies(trimester, profil).then(competencies => this.setState({ competencies }));
  };

  render() {
    return (
      <View>
        {/*<TabView*/}
        {/*  onIndexChange={this.setIndex}*/}
        {/*  navigationState={{ 0, }}*/}
        {/*  renderScene={SceneMap({*/}

        {/*  })}*/}
        {/*/>*/}
        <FlatList
          data={this.state.trimesters}
          renderItem={({item}) =>
            <Text onPress={() => this.fetchCompetencies(item.id, item.profiles[0].id)}>{item.id}</Text>
          }
        />
        <FlatList
          data={this.state.competencies}
          numColumns={2}
          renderItem={({item}) => {
            const percentCompleted = Math.round((item.score / item.total) * 100);
            console.log(percentCompleted);
            const grade: Grade = getGrade(percentCompleted);

            return(
              <Card style={{ backgroundColor: grade.color }}>
                <Card.Title title={item.id}/>
                <Card.Content>
                 <Text>{grade.value}</Text>
                </Card.Content>
              </Card>
            )}
          }
        />
      </View>
    )
  }
}