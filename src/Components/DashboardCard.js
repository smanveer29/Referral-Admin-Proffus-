import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../Helper/Colors'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const DashboardCard = ({ data }) => {
    const navigation=useNavigation()
    return (
        <TouchableOpacity 
        // style={data.icon==='shopping-bag'?{...styles.cont,width:'93%'}:{...styles.cont}} 
        style={styles.cont} 
        onPress={()=>{data.screen && navigation.navigate(data.screen)}}
        >
            <Icon name={data.icon} size={30} color="#000"/>
            <Text style={{ ...styles.text }}>{data.name}</Text>
        </TouchableOpacity>
    )
}

export default DashboardCard

const styles = StyleSheet.create({
    cont: {
        borderWidth: 1,
        borderColor: Colors.primary,
        width: '45%',
        height:140,
        alignItems: 'center',
        justifyContent:'space-evenly',
        borderRadius:15,
        padding:15,
        backgroundColor: '#fff',
        elevation:3,
        marginVertical:5
    },
    text: {
        textTransform: 'capitalize',
        fontWeight: '700',
        marginVertical:10,
        textAlign: 'center'
    }
})