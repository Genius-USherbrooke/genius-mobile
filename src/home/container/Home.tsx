import React, { Component } from 'react';
import {View, FlatList, StyleSheet, Dimensions} from "react-native";
import { Card, Text, ProgressBar } from 'react-native-paper';
import {Competency, fetchCompetencies, fetchSession, fetchTrimesters, Session, Trimester} from "../../main/service/gel";
import { getGrade, Grade } from "../../main/utils/conversionTable";
import { NavigationInjectedProps, withNavigation } from "react-navigation";

interface State {
  session: Session;
  trimesters: Trimester[];
  competencies: Competency[];
}

class Home extends Component<NavigationInjectedProps, State> {

  constructor(props) {
    super(props);

    this.state = {
      session: {
        user: {
          cip: '',
          email: '',
          fullName: '',
        }
      },
      trimesters: [],
      competencies: []
    };

    this.fetchSession()
    this.fetchTrimesters();
  }

  fetchSession = () => fetchSession().then(session => this.setState({ session }));

  fetchTrimesters = () => fetchTrimesters().then(trimesters => this.setState({ trimesters }));

  fetchCompetencies = (trimester: string, profil: string) => {
    fetchCompetencies(trimester, profil).then(competencies => this.setState({ competencies }));
  };

  navigateCompetency = (competency: Competency) => this.props.navigation.navigate('Competency', {'competency': competency});

  render() {
    return(
      <View style={styles.container}>
        <Text>Name: {this.state.session.user.fullName}</Text>
        <Text>Cip: {this.state.session.user.cip}</Text>

        <FlatList
          data={this.state.trimesters}
          renderItem={({item}) =>
            <Text onPress={() => this.fetchCompetencies(item.id, item.profiles[0].id)}>{item.id}</Text>
          }
        />
        <FlatList
          data={this.state.competencies}
          numColumns={2}
          columnWrapperStyle={styles.column}
          renderItem={({item}) => {
            let grade: Grade | null = null;
            let relativePercent = null;

            if (item.completedTotal) {
              relativePercent = item.score / item.completedTotal;
              grade = getGrade(relativePercent);
            }

            const percentCompleted = item.completedTotal / item.total;

            return(
              <Card
                style={{ borderWidth: 3, borderColor: grade ? grade.color : 'white', backgroundColor: percentCompleted === 1 ? 'lightgray' : 'white', ...styles.competency }}
                onPress={() => this.navigateCompetency(item)}
              >
                <Card.Title
                  title={item.id}
                  subtitle={relativePercent ? `${Math.round(relativePercent * 100)}%` : ''}
                />
                <Text style={styles.grade}>{grade ? grade.letter: ''}</Text>
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

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  column: {
    justifyContent:'space-between'
  },
  competency: {
    // flex: 0.5,
    width: windowWidth * 0.47,
    margin: 5,
  },
  grade: {
    position: 'absolute',
    alignSelf: 'flex-end',
    fontSize: 28,
    marginTop: 10,
    paddingRight: 10,
  },
});

export default withNavigation(Home);