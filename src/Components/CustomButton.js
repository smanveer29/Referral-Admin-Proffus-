import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../Helper/Colors'

const CustomButton = ({title,press}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={press}>
      <Text style={{color:'white',fontSize:18,fontWeight:'800'}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    btn:{
        width:'90%',
        height:45,
        alignSelf:'center',
        backgroundColor:Colors.primary,alignItems: 'center',justifyContent:'center',borderRadius:5,marginVertical:10
    }
})