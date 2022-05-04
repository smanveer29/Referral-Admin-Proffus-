import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './src/Screens/Dashboard';
import UpdateLeads from './src/Screens/UpdateLeads';
import UsersDetails from './src/Screens/UsersDetails';
import ProductManager from './src/Screens/ProductManager';
import UserInfo from './src/Components/UserInfo';
import AddProduct from './src/Screens/AddProduct';
import ServicesScreen from './src/Screens/ServicesScreen';
import AddService from './src/Screens/AddService';
import ChangeBanner from './src/Screens/ChangeBanner';
import UpdateTrendings from './src/Screens/UpdateTrendings';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
    <StatusBar
        animated={true}
        barStyle="dark-content"
        networkActivityIndicatorVisible={true}
        backgroundColor="white"
        translucent
        />
      <Stack.Navigator screenOptions={horizontalAnimation}>
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="UpdateLeads" component={UpdateLeads}/>
        <Stack.Screen name="Users" component={UsersDetails}/>
        <Stack.Screen name="UserInfo" component={UserInfo}/>
        <Stack.Screen name="Products" component={ProductManager}/>
        <Stack.Screen name="AddProduct" component={AddProduct}/>
        <Stack.Screen name="AddService" component={AddService}/>
        <Stack.Screen name="Service" component={ServicesScreen}/>
        <Stack.Screen name="Banner" component={ChangeBanner}/>
        <Stack.Screen name="UpdateTrending" component={UpdateTrendings}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App
const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
