import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Helper/Header'
import CustomButton from '../Components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";
import ProductsCard from '../Components/ProductsCard'
const ProductManager = () => {
  const navigation = useNavigation()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    firestore().collection('Products')
      .onSnapshot((e) => {
        console.log(e.docs.length)
        setProducts(e.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        setLoading(false)
      })
  }, [navigation])
  return (
    <View style={styles.cont}>
      <Header title="Products Manager" />
      <View style={{ marginVertical: 20 }}>
        <CustomButton title="Add Product" press={() => navigation.navigate('AddProduct')} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} vertical>
        <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, marginHorizontal: 30, marginBottom: '30%' }}>
          {products.length > 0 &&
            loading ?
            products.map(item =>
              <View key={item.id} style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly' ,width:'100%'}}>
                <Placeholder style={{
                  width: '50%',
                  height: 150,
                  marginVertical: 10,
                }}
                  Animation={Fade}>
                  <PlaceholderMedia style={{ width: '100%', alignSelf: 'center', marginVertical: 10, }} />
                  <PlaceholderLine />
                  <PlaceholderLine />
                </Placeholder>
              </View>
            )
            :
            products.map(item =>
              <ProductsCard data={item} key={item.id} />
            )
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default ProductManager

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: '#fff'
  }
})