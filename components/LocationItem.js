import React from 'react'
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils';


const LocationItem = ({ item: {city, state, country} }) => (
  <View style={styles.container} >
    <View style={styles.main}>
      <Text style={styles.city}>{city}</Text>
      <View >
        <Text >{state}, {country}</Text>
      </View>
    </View>
    <Feather name="arrow-right" size={25} color={colors.PRIMARY_COLOR} />
  </View>
);

const styles = StyleSheet.create({
  container:  {
    backgroundColor: '#c4c4c4',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  main: {
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.PRIMARY_COLOR,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2
  },
  city: {
    fontWeight: 'bold',
    fontSize: 15
  }
})

export default LocationItem