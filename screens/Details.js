import React from 'react'
import { Text, View } from 'react-native'

const Details = ({route}) => {
  return(
    <View>
      <Text>Details Screen</Text>
    {route.params.name && <Text>{route.params.name}</Text>}
    </View>
  )
}

export default Details