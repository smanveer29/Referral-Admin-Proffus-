import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Helper/Header'
import CustomInput from '../Components/CustomInput'

import firestore from '@react-native-firebase/firestore';
import { Colors } from '../Helper/Colors';
import CustomButton from '../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
const AddProduct = () => {
   const navigation=useNavigation()
   const [label,setLabel]=useState('')
   const [offer,setOffer]=useState('')
   const [link,setLink]=useState('')
   const [loading,setLoading]=useState(false)

   const add=()=>{
      setLoading(true)
      firestore().collection('Products')
      .add({
         offer:offer,
         label:label,
         link:link
      }).then(()=>{
         setLoading(false)
         navigation.goBack()
      }).catch(e=>console.log(e))

   }
  return (
    <View style={styles.cont}>
    <Header title="Add Product"/>
    <ScrollView vertical showsVerticalScrollIndicator={false} style={{marginVertical:20}}>
    <CustomInput
       label="Product Name"
       value={label}
       onChangeText={e=>setLabel(e)}
    />
    <CustomInput
       label="Offer"
       value={offer}
       onChangeText={e=>setOffer(e)}
    />
    <CustomInput
       label="Link"
       value={link}
       onChangeText={e=>setLink(e)}
    />
    {!label || !offer || !link ? <>

    </>
    :
       loading?<ActivityIndicator size="large" color={Colors.primary}/>:<CustomButton title="Add" press={add}/>
       }
    </ScrollView>
    </View>
  )
}

export default AddProduct

const styles = StyleSheet.create({
   cont:{
      flex:1,backgroundColor: '#fff'
   }
})