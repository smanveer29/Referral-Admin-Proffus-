import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../Helper/Colors';
import firestore from '@react-native-firebase/firestore';
const ServiceCard = ({ data }) => {
  const navigation = useNavigation()
  console.log(data)
  const remove = () => {
    Alert.alert("Remove Service", 'Are you Sure you want to remove?',
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {

            firestore().collection('Services').doc(data.id).delete().then(() => alert('Service Deleted'))
          }
        }
      ])
  }
  return (
    <TouchableOpacity style={styles.card}
    // onPress={() => navigation.navigate('SelectiveService', { data: data })}
    >
      <Text style={{ ...styles.text, textTransform: 'uppercase', fontSize: 18, fontWeight: '700' }}>{data.name}</Text>
      <Text style={{ ...styles.text, fontSize: 16, fontWeight: '500' }}>{data.offer}</Text>
      <Text style={{ ...styles.text, lineHeight: 20, fontSize: 16 }}>{data.detail}</Text>
      <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={remove}>
        <Icon size={25} color={Colors.primary} name="cross" />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default ServiceCard

const styles = StyleSheet.create({
  card: {
    width: '90%',
    height: 150,
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 0.5, borderColor: Colors.primary, borderRadius: 10, alignSelf: 'center'
  },
  text: {
    color: 'black',
    textTransform: 'capitalize'
  }
})