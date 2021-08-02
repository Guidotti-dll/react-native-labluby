import React from 'react'
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../utils';


const LocationItem = ({ item , navigation }) => (
  <TouchableOpacity  style={styles.container} onPress={() =>
    navigation.push("Details", { name: item.city , data: item })} >
    <View style={styles.main}>
      <Text style={styles.city}>{item.city}</Text>
      <View >
        <Text >{item.state_code}, {item.country}</Text>
      </View>
    </View>
    <Feather name="arrow-right" size={25} color={colors.PRIMARY_COLOR} />
  </TouchableOpacity>
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