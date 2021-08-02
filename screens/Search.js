import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '../utils';


function Search() {
  return (
    <View style={styles.container}>
      <View >
        <Text style={styles.subTitle}>Type your location here</Text>
        <TextInput style={styles.input} />
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert('Search')}
          >
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert('location')}
          >
            <MaterialCommunityIcons name="crosshairs-gps" color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.title}>Previous Searches</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input : {
    borderWidth: 1,
    borderColor: colors.BORDER_COLOR,
    borderRadius: 4,
    padding: 5,
  },
  actions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.PRIMARY_COLOR,
    width: 90,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title : {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20
  },
  subTitle : {
    fontSize: 16,
    marginBottom: 15
  }
})

export default Search;