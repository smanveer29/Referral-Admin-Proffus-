import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { Colors } from '../Helper/Colors';
import Icon from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore'
const TrendingCard = ({ data }) => {
    const remove = (item) => {
        Alert.alert(
            "Remove Trending",
            "Are you sure you want to remove this?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        firestore().collection('Trending')
                            .doc(item)
                            .delete()
                            .then(() => {
                                alert('Delete')
                            }).catch(err => { console.log(err) })
                    }
                }
            ]
        );
    }
    return (
        <View style={styles.card}>
            <Text style={{ ...styles.text, fontWeight: '800', fontSize: 18 }}>Refer & earn</Text>
            <Text style={{ ...styles.text, marginVertical: 2 }}>{data.offer}</Text>
            <Image source={{ uri: data.image_url }} style={{ width: 80, resizeMode: 'contain', height: 40 }} />
            <Text style={{ ...styles.text, marginTop: 10, fontSize: 10, textTransform: 'none', textAlign: 'center' }}>{data.detail}</Text>
            <TouchableOpacity style={{ position: 'absolute', top: 5, right: 5 }} onPress={() => remove(data.id)}>
                <Icon name="cross" size={20} color="red" />
            </TouchableOpacity>
        </View>
    )
}

export default TrendingCard

const styles = StyleSheet.create({
    linearGradient: {
        padding: 20
    },
    card: {
        width: '30%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 15,
        marginVertical: 4,
        backgroundColor: Colors.trending,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }, text: {
        textTransform: 'capitalize',
        color: 'white',
    }
})