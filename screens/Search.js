import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '../utils';
import { useDispatch, useSelector } from 'react-redux';

const Location = ({ item: {city, state, country} }) => (
  <View >
    <Text >{city}</Text>
    <Text >{state}</Text>
    <Text >{country}</Text>
  </View>
);


function Search() {
  const locations = useSelector(state => state.locations)
  const dispatch = useDispatch();
  const [enteredLocation, setEnteredLocation] = useState('')

  const submitHandler = async () => {
    try {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q=${enteredLocation}`)
      const result = await response.json()
      if(result.status.code === 400){
        throw new Error(result.status.message)
      }

      const newLocation = {
        city: result.results[0].components.city,
        state: result.results[0].components.state_code,
        country: result.results[0].components.country,
        latitude: result.results[0].geometry.lat.toString(),
        longitude: result.results[0].geometry.lng.toString(),
      }
      dispatch({type: 'addLocation', location: newLocation})
    } catch (error) {
      alert('Unable to find the city, is the name correct?')
    }
  }

  return (
    <View style={styles.container}>
      <View >
        <Text style={styles.subTitle}>Type your location here</Text>
        <TextInput style={styles.input}  onChangeText={text => setEnteredLocation(text)}/>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={submitHandler}
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
        <FlatList
        data={locations}
        renderItem={Location}
        keyExtractor={location => `${location.latitude}/${location.longitude}`}
      />
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