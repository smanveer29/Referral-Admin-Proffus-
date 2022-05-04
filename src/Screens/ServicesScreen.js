import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import firestore from '@react-native-firebase/firestore';
import { Fade, Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder'
import ServiceCard from '../Components/ServiceCard'
import Header from '../Helper/Header';
import CustomButton from '../Components/CustomButton';
const ServicesScreen = ({ route }) => {
  const navigation = useNavigation()
  const data = route.params.data
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  console.log(data, "Services")
  useEffect(() => {
    firestore().collection('Services')
      .where('service', '==', data.label)
      .onSnapshot(e => {
        setList(e.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        setLoading(false)
      })
  }, [navigation])

  return (
    <View style={styles.cont}>
      <Header title={data.label} />
      <View style={{ width: '100%', alignSelf: 'center',marginTop:10 }}>
        <CustomButton title="Add" press={() => navigation.navigate('AddService', { data: data })}/>
      </View>
      {list.length > 0 &&
        list.map(item =>
          <View key={item.id} style={{ marginTop: 20, alignItems: 'center' }}>
            {loading ?
              <Placeholder style={{
                width: '80%',
                height: 150,
                marginVertical: 10,
              }}
                Animation={Fade}>
                {/* <PlaceholderMedia style={{ width: '100%', alignSelf: 'center', marginVertical: 10, }} /> */}
                <PlaceholderLine width={40} />
                <PlaceholderLine width={80} />
                <PlaceholderLine />
                <PlaceholderLine width={20} />
              </Placeholder>
              :
                <ScrollView vertical showsVerticalScrollIndicator={false} style={{ width: '100%'}}>
                  <ServiceCard data={item} />
                </ScrollView>
            }
          </View>
        )}
    </View>
  )
}

export default ServicesScreen

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: '#fff'
  }
})