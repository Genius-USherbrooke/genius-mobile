import React, { Component } from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';
import ConversionTable from "../../main/utils/conversionTable";

export default class Chart extends Component {
  render() {
    return(
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Notes en pourcentage</DataTable.Title>
            <DataTable.Title>Lettres attribuées</DataTable.Title>
            <DataTable.Title>Valeurs numériques</DataTable.Title>
          </DataTable.Header>

          {ConversionTable.grades.slice(0).reverse().map(grade =>
              <DataTable.Row style={{backgroundColor: grade.color}} key={grade.value}>
                <DataTable.Cell>{grade.minPercent}% à {grade.maxPercent}%</DataTable.Cell>
                <DataTable.Cell>{grade.letter}</DataTable.Cell>
                <DataTable.Cell numeric>{grade.value}</DataTable.Cell>
              </DataTable.Row>
          )}
        </DataTable>
      </View>
    );
  }
}