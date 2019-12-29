import React, { Component } from 'react';
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import {NavigationInjectedProps, withNavigation} from "react-navigation";
import {DataTable, Text, Appbar } from 'react-native-paper';
import {Competency} from "../../main/service/gel";
import {getGrade, grades} from "../../main/utils/conversionTable";

interface NavProps {
  competency: Competency
}

class _Competency extends Component<NavigationInjectedProps<NavProps>> {

  constructor(props) {
    super(props);
  }

  render() {
    const competency = this.props.navigation.state.params.competency;

    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()}/>
          <Appbar.Content
            title={competency.id}
          />
        </Appbar.Header>
        <Text>{competency.score}/{competency.total}</Text>
        <Text>{Math.round((competency.score / competency.total) * 100)}%</Text>
        <FlatList
          data={competency.sub_competencies}
          renderItem={({item}) =>
            <View style={{flex: 1}}>
              <Text>{item.id}</Text>
              <Text>{item.score}/{item.total}</Text>
              <Text>{Math.round((item.score / item.total) * 100)}%</Text>

              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>App</DataTable.Title>
                  <DataTable.Title>Label</DataTable.Title>
                  <DataTable.Title numeric>Score</DataTable.Title>
                  <DataTable.Title numeric>Total</DataTable.Title>
                </DataTable.Header>

                {item.evaluations.map(evaluation => {
                    const grade = getGrade(evaluation.score/evaluation.total);

                    return(
                      <DataTable.Row style={{backgroundColor: grade.color}} key={grade.value}>
                        <DataTable.Cell>{evaluation.app}</DataTable.Cell>
                        <DataTable.Cell>{evaluation.label}</DataTable.Cell>
                        <DataTable.Cell numeric>{evaluation.score}</DataTable.Cell>
                        <DataTable.Cell numeric>{evaluation.total}</DataTable.Cell>
                      </DataTable.Row>
                    )
                  }
                )}

                <DataTable.Row key="total">
                  <DataTable.Cell>Total</DataTable.Cell>
                  <DataTable.Cell>Total</DataTable.Cell>
                  <DataTable.Cell numeric>{item.score}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.total}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({ });

export default withNavigation(_Competency);