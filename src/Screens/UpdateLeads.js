import { ScrollView, StyleSheet, Text, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import LeadsCard from '../Components/LeadsCard';


const UpdateLeads = () => {
  const navigation=useNavigation()
  const [data,setData]=useState([])
  useEffect(() => {
    firestore().collection('Leads')
    .onSnapshot(e=>setData(e.docs.map(doc=>({...doc.data(),id:doc.id}))))
  }, [navigation])
  
  return (
    <View style={styles.cont}>
    <ScrollView>
    {data.length>0  && data.map(item=><LeadsCard item={item} key={item.id} edit={true}/>) }
    </ScrollView>
    </View>
  )
}

export default UpdateLeads

const styles = StyleSheet.create({
  cont:{
    flex:1,
    backgroundColor:'#fff'
  }
})