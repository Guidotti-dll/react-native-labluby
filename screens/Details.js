import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../utils'

const Details = ({route : {params : {data}}}) => {
  return(
    <View style={styles.container}>
      <View style={styles.main}> 
      {data.city &&  
        <View style={styles.info}>
          <Text style={styles.label}>City: </Text>
          <Text style={styles.text}>{data.city}</Text>
        </View>
      }
      {data.state && data.state_code &&
        <View style={styles.info}>
          <Text style={styles.label}>State: </Text>
          <Text style={styles.text}>{data.state}-({data.state_code})</Text>
        </View>
      }
      {data.country &&  
        <View style={styles.info}>
          <Text style={styles.label}>Country: </Text>
          <Text style={styles.text}>{data.country}</Text>
        </View>
      }
      {data.county &&  
        <View style={styles.info}>
          <Text style={styles.label}>County: </Text>
          <Text style={styles.text}>{data.county}</Text>
        </View>
      }
      {data.latitude &&  
        <View style={styles.info}>
          <Text style={styles.label}>Latitude: </Text>
          <Text style={styles.text}>{data.latitude}</Text>
        </View>
      }
      {data.longitude &&  
        <View style={styles.info}>
          <Text style={styles.label}>Longitude: </Text>
          <Text style={styles.text}>{data.longitude}</Text>
        </View>
      }
      {data.region &&  
        <View style={styles.info}>
          <Text style={styles.label}>Region: </Text>
          <Text style={styles.text}>{data.region}</Text>
        </View>
      }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  main: {
    borderWidth: 1,
    borderColor: colors.BORDER_COLOR,
    borderRadius: 8,
    padding: 10
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  },
  label: {
    fontWeight: 'bold',
    color: colors.PRIMARY_COLOR,
    fontSize: 15
  },
  text: {
    color: colors.SECONDARY_COLOR
  }
})
export default Details