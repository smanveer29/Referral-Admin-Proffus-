import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../Helper/Colors'
import Icon from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';

const ProductsCard = ({ data }) => {
    const navigation = useNavigation()
    const remove = () => {
        Alert.alert(`Remove ${data.label}`, 'Are you Sure you want to remove?',
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "OK", onPress: () => {
    
                firestore().collection('Products').doc(data.id).delete().then(() => alert(`${data.label} Deleted successfully`))
              }
            }
          ])
      }
    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Service', { data: data })}>
            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ ...styles.text, fontSize: 16 }}>{data.label}</Text>
            </View>
            <View style={{ flex: 0.5, width: '100%', justifyContent: 'flex-end' }}>
                <Text style={{ ...styles.text, color: Colors.primary, backgroundColor: '#F6E8FF', padding: 5, borderRadius: 10, fontWeight: 'bold', fontSize: 12 }}>
                    {data.offer}
                </Text>
            </View>
            <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={remove}>
                <Icon size={18} color={Colors.primary} name="cross" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default ProductsCard

const styles = StyleSheet.create({
    card: {
        width: '45%',
        height: 150,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 10,
        borderWidth: 1, borderColor: Colors.primary, borderRadius: 20,
        backgroundColor: '#fff',
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        color: 'black',
        textTransform: 'capitalize',
        marginVertical: 10,
        textAlign: 'center'
    }
})