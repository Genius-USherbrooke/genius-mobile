import React, { Component } from 'react';
import {View, FlatList, StyleSheet, ScrollView, Dimensions} from "react-native";
import { Card, Title, Text, ProgressBar } from 'react-native-paper';
import { Competency, fetchCompetencies, fetchTrimesters, Trimester } from "../../main/service/gel";
import { TabView, SceneMap } from 'react-native-tab-view';
import {getGrade, Grade} from "../../main/utils/conversionTable";
import {NavigationInjectedProps, withNavigation} from "react-navigation";

interface State {
  navIndex: number;
  trimesters: Trimester[];
  competencies: Competency[];
}

class Home extends Component<NavigationInjectedProps, State> {

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

  navigateCompetency = (competency: Competency) => this.props.navigation.navigate('Competency', {'competency': competency});

  render() {
    return(
      <View >
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
          columnWrapperStyle={{justifyContent:'space-between'}}
          renderItem={({item}) => {
            const relativePercent = item.score / item.completedTotal;
            const grade: Grade = getGrade(relativePercent);

            const percentCompleted = item.completedTotal / item.total;

            return(
              <Card
                style={{ borderWidth: 3, borderColor: grade.color, ...styles.competency }}
                onPress={() => this.navigateCompetency(item)}
              >
                <Card.Title
                  title={item.id}
                  subtitle={`${Math.round(relativePercent * 100)}%`}
                />
                <Text style={styles.grade}>{grade.letter}</Text>
                <Card.Content>
                  <ProgressBar progress={percentCompleted}/>
                </Card.Content>
              </Card>
            )}
          }
        />
      </View>
    )
  }
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  competency: {
    flex: 0.5,
    margin: 5,
  },
  grade: {
    position: 'absolute',
    alignSelf: 'flex-end',
    fontSize: 28,
    marginTop: 10,
    paddingRight: 10,
  }
});

export default withNavigation(Home);