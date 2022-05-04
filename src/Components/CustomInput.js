import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { Colors } from '../Helper/Colors'

const CustomInput = (props) => {
  return (
    <TextInput
    style={styles.input}
    theme={{colors:{primary:'#fff',placeholder:'black',text:Colors.primary},roundness:10,dark:true}}
    outlineColor='#c8c8c8'
    underlineColor='transparent'
    activeOutlineColor={Colors.primary}
    mode='outlined'
    dense
    {...props}
    />
  )
}

export default CustomInput

const styles = StyleSheet.create({
    input:{
        width:'90%',
        height:60,
        alignSelf:'center',
        elevation:5,
        marginVertical:5,
        backgroundColor:'#fff'
    }
})