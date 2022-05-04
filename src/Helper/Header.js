import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from './Colors'

const Header = ({ title }) => {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerTintColor: Colors.primary,
      headerTitleStyle: { color: 'black', textTransform: 'capitalize' },
      headerStyle: { shadowColor: '#000' },
    })
  }, [navigation])
  return (
    <View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})