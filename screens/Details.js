import React from 'react'
import { Text, View } from 'react-native'

const Details = ({route : {params : {data}}}) => {
  return(
    <View>
      <View> 
      {data.city &&  <Text>City: {data.city}</Text>}
      {data.state && data.state_code &&  <Text>State: {data.state}-({data.state_code})</Text>}
      {data.country &&  <Text>Country: {data.country}</Text>}
      {data.county &&  <Text>County: {data.county}</Text>}
      {data.latitude &&  <Text>Latitude: {data.latitude}</Text>}
      {data.longitude &&  <Text>Longitude: {data.longitude}</Text>}
      {data.region &&  <Text>Region: {data.region}</Text>}
      </View>
    </View>
  )
}


export default Details