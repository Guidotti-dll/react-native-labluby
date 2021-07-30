import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import {WEATHER_API_KEY} from '@env'
import { colors } from './utils';
import ReloadIcon from './components/ReloadIcon';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?'

export default function App() {
  const [errorMessage, setErrorMessage] = useState('')
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')

  
  useEffect(( ) => {
    load()
  }, [unitsSystem])

  const load = async () => {
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      let {status} = await Location.requestBackgroundPermissionsAsync()

      if(status !== 'granted'){
        setErrorMessage('Access to location is needed to run the app')
        return;
      }

      const location = await Location.getCurrentPositionAsync()
      const {latitude, longitude} = location.coords;
      const url = `${BASE_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
      const response = await fetch(url)
      const result = await response.json()
      if(response.ok){
        setCurrentWeather(result)
      }else{
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  if(currentWeather){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
        <UnitsPicker  unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
        <ReloadIcon load={load} />
        <WeatherInfo  currentWeather={currentWeather}/>
        </View>
      </View>
    )
  }else if (errorMessage){
    return(
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  }
});
