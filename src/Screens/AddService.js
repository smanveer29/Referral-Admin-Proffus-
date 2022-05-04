import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Helper/Header'
import CustomInput from '../Components/CustomInput'
import CustomButton from '../Components/CustomButton'

import firestore from '@react-native-firebase/firestore';
import { Colors } from '../Helper/Colors'
import { useNavigation } from '@react-navigation/native'
const AddService = ({route}) => {
   const navigation=useNavigation()
   const data=route?.params?.data
   const [name,setName]=useState('')
   const [detail,setDetail]=useState('')
   const [offer,setOffer]=useState('')
   const [link,setLink]=useState('')
   const [perform,setPerform]=useState('')
   const [loading,setLoading]=useState(false)

   const add=()=>{
      setLoading(true)
      firestore().collection('Services')
      .add({
         detail: detail,
         name:name.toUpperCase(),
         offer:offer,
         service:data.label,
         link:link,
         perform:perform
      }).then(()=>{
         setLoading(false)
         navigation.goBack()
      }).catch(e=>console.log(e))

   }
  return (
    <View style={styles.cont}>
    <Header title="Add Service"/>
    <ScrollView vertical showsVerticalScrollIndicator={false}>
    <CustomInput
       label="Service Name"
       value={name}
       onChangeText={e=>setName(e)}
    />
    <CustomInput
       label="Offer"
       value={offer}
       onChangeText={e=>setOffer(e)}
    />
    <CustomInput
       label="Details"
       value={detail}
       onChangeText={e=>setDetail(e)}
    />
    <CustomInput
       label="Link"
       value={link}
       onChangeText={e=>setLink(e)}
    />
    <CustomInput
       label="How To Perform"
       value={perform}
       multiline={true}
       numberOfLines={10}
       onChangeText={e=>setPerform(e)}
    />
    {!name || !detail || !offer || !link || !perform ?<>

    </>
    :
       loading?<ActivityIndicator size="large" color={Colors.primary}/>:<CustomButton title="Add" press={add}/>
       }
    </ScrollView>
    </View>
  )
}

export default AddService

const styles = StyleSheet.create({
   cont:{
      flex:1,backgroundColor:'#fff'
   }
})