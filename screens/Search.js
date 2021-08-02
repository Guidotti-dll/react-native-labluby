import React, { useState } from 'react';
import * as Location from 'expo-location'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import LocationItem from '../components/LocationItem';


function Search() {
  const locations = useSelector(state => state.locations)
  const dispatch = useDispatch();
  const [enteredLocation, setEnteredLocation] = useState('')

  const submitHandler = async (location) => {
    console.log(location)
    try {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q=${location ? location : enteredLocation }`)
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
      setEnteredLocation('')
    } catch (error) {
      alert('Unable to find the city, is the name correct?')
    }
    
  }

  const getLocation = async () => {
    const location = await Location.getCurrentPositionAsync()
    const {latitude, longitude} = location.coords;
    submitHandler(`${latitude},${longitude}`)
  }

  return (
    <View style={styles.container}>
      <View >
        <Text style={styles.subTitle}>Type your location here</Text>
        <TextInput style={styles.input} defaultValue={enteredLocation}  onChangeText={text => setEnteredLocation(text)}/>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => submitHandler('')}
          >
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={getLocation}
          >
            <MaterialCommunityIcons name="crosshairs-gps" color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.title}>Previous Searches</Text>
        <FlatList
        data={locations}
        renderItem={LocationItem}
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