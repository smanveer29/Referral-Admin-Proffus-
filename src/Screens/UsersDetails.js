import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../Helper/Header'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import { Colors } from '../Helper/Colors';
import LeadsCard from '../Components/LeadsCard';
const UsersDetails = () => {
   const navigation = useNavigation()
   const [users, setUsers] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      firestore()
         .collection('users')
         .onSnapshot(e => {
            setUsers(e.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
         })

      firestore().collection('Leads')
   }, [navigation])

   return (
      <View style={styles.cont}>
         <Header title="List Of Users"/>
         {loading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={Colors.primary} />
         </View>
            :
            <ScrollView vertical showsVerticalScrollIndicator={false} style={{ width: '100%',marginVertical:30 }}>
               {users.map(item => 
               <LeadsCard item={item} key={item.id}/>
               )
               }
            </ScrollView>
         }
      </View>
   )
}

export default UsersDetails

const styles = StyleSheet.create({
   cont: {
      flex: 1,
      backgroundColor: '#fff',
   },
   card: {
      width: '90%',
      padding: 20,
      elevation: 5, backgroundColor: '#fff',
      marginVertical: 10, borderRadius: 10, alignSelf: 'center'
   }
})