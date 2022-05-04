import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import DashboardCard from '../Components/DashboardCard'
import Header from '../Helper/Header'

const DashBoard = () => {
  const navigation = useNavigation()
  const tabs = [
    { name: 'add/modify/remove products', icon: 'list-alt' ,screen:'Products'},
    { name: 'change leads status', icon: 'cogs',screen:'UpdateLeads' },
    { name: 'users details', icon: 'address-book',screen:'Users' },
    { name: 'update banners', icon: 'image',screen:'Banner' },
    { name: 'update trendings', icon: 'bandcamp',screen:'UpdateTrending' },
    // { name: 'Coming Soon', icon: 'exclamation-triangle', }
  ]
  return (
    <ImageBackground source={require('../Assets/Images/bombaybg.png')} style={styles.cont}>
    <Header title="Dashboard"/>
    <ScrollView vertical showsVerticalScrollIndicator={false}>
      <Image source={require('../Assets/Images/dashboard.png')} style={{ width: '100%', height: 300, resizeMode: 'contain',alignSelf:'center' }} />
      <View style={{ flexWrap: 'wrap', flexDirection: 'row', width: '80%',alignSelf:'center',justifyContent:'space-evenly'}}>
        {tabs.map((item, index) => <DashboardCard data={item} key={index} />)}
      </View>
    </ScrollView>
    </ImageBackground>
  )
}

export default DashBoard

const styles = StyleSheet.create({
   cont:{
      flex:1
   }
})