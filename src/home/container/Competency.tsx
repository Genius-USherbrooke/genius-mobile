import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from "react-native";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { DataTable, Text, Appbar, Divider, Title } from 'react-native-paper';
import { Competency } from "../../main/service/gel";
import { getGrade } from "../../main/utils/conversionTable";

interface NavProps {
  competency: Competency
}

class _Competency extends Component<NavigationInjectedProps<NavProps>> {

  constructor(props) {
    super(props);
  }

  average = (score: number) => Math.round(score * 100) / 100;

  render() {
    const competency = this.props.navigation.state.params.competency;

    return (
      <View style={{flex:1}}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.navigate('Home')}/>
          <Appbar.Content
            title={competency.id}
          />
        </Appbar.Header>
        <Text>Total: {this.average(competency.score)}/{competency.total}</Text>
        <Text>Absolute: {Math.round((competency.score / competency.total) * 100)}%</Text>
        <Text>Relative: {competency.completedTotal ? `${Math.round((competency.score / competency.completedTotal) * 100)}%` : '-'}</Text>
        <Divider/>
        <FlatList
          data={competency.sub_competencies.sort((a, b) => Number(a.id) - Number(b.id))}
          renderItem={({item}) =>
            <View style={{flex: 1}}>
              <Title>{competency.id}-{item.id}</Title>
              <Text>{this.average(item.score)}/{item.total}</Text>
              <Text>Total {Math.round((item.score / item.total) * 100)}%</Text>
              <Text>Relative: {item.completedTotal ? `${Math.round((item.score / item.completedTotal) * 100)}%` : '-'}</Text>

              <DataTable>
                <DataTable.Header>
                  <DataTable.Title style={styles.labelCol}>Label</DataTable.Title>
                  <DataTable.Title style={styles.numCol} numeric>Score</DataTable.Title>
                  <DataTable.Title style={styles.numCol} numeric>Total</DataTable.Title>
                </DataTable.Header>

                {item.evaluations.map(evaluation => {
                    const grade = getGrade(evaluation.score/evaluation.total);

                    return(
                      <DataTable.Row key={evaluation.label}>
                        <DataTable.Cell style={styles.labelCol}>{evaluation.label}</DataTable.Cell>
                        <DataTable.Cell style={{borderBottomWidth: 3, borderBottomColor: evaluation.completed ? grade.color : 'transparent', ...styles.numCol}} numeric>{evaluation.completed ? evaluation.score : '-'}</DataTable.Cell>
                        <DataTable.Cell style={styles.numCol} numeric>{evaluation.total}</DataTable.Cell>
                      </DataTable.Row>
                    )
                  }
                )}

                <DataTable.Row style={{borderTopWidth: 1, borderTopColor: 'black'}} key="total">
                  <DataTable.Cell style={styles.labelCol}>Total</DataTable.Cell>
                  <DataTable.Cell style={{borderBottomWidth: 3, borderBottomColor: item.completedTotal ? getGrade(item.score/item.completedTotal).color : 'transparent', ...styles.numCol }} numeric>{item.completedTotal ? this.average(item.score) : '-'}</DataTable.Cell>
                  <DataTable.Cell style={styles.numCol} numeric>{this.average(item.total)}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  labelCol: {
    flex: 3,
  },
  numCol: {
    flex: 1,
  },
});

export default withNavigation(_Competency);