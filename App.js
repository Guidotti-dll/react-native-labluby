import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'
import {WEATHER_API_KEY} from '@env'
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?'

export default function App() {
  const [errorMessage, setErrorMessage] = useState('')
  const [currentWeather, setCurrentWeather] = useState(null)

  
  useEffect(( ) => {
    load()
  }, [])

  const load = async () => {
    try {
      let {status} = await Location.requestBackgroundPermissionsAsync()

      if(status !== 'granted'){
        setErrorMessage('Access to location is needed to run the app')
        return;
      }

      const location = await Location.getCurrentPositionAsync()
      const {latitude, longitude} = location.coords;

      const url = `${BASE_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
      const response = await fetch(url)
      const result = await response.json()
      if(response.ok){
        setCurrentWeather(result)
      }else{
        setErrorMessage(result.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if(currentWeather){
    const {main: {temp}} = currentWeather
    return (
      <View style={styles.container}>
        <Text>{temp}</Text>
        <StatusBar style="auto" />
      </View>
    )
  }else{
    return(
      <View style={styles.container}>
        <Text>{errorMessage}aaaaaa</Text>
        <StatusBar style="auto" />
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
