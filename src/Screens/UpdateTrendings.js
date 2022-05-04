import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Helper/Header'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../Helper/Colors'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import CustomButton from '../Components/CustomButton'
import { launchImageLibrary } from 'react-native-image-picker'
import TrendingCard from '../Components/TrendingCard'
import CustomInput from '../Components/CustomInput'

import Icon from 'react-native-vector-icons/Entypo';
import { ActivityIndicator } from 'react-native-paper'
const UpdateTrendings = () => {
   const navigation = useNavigation()
   const [trending, setTrending] = useState([])
   const [detail, setDetail] = useState('')
   const [image, setImage] = useState('')
   const [offer, setOffer] = useState('')
   const [tap, setTap] = useState(false)
   const [loading, setLoading] =useState(false)
   useEffect(() => {
      firestore().collection('Trending')
         .onSnapshot(e => {
            setTrending(e.docs.map(doc => ({ ...doc.data(), id: doc.id })))
         })
   }, [navigation])
   const chooseFile = () => {
      let options = {
         mediaType: 'photo',
         maxWidth: 300,
         maxHeight: 300,
         quality: 1,
      };
      launchImageLibrary(options, (response) => {
         setLoading(true)
         console.log('Response = ', response);
         if (response.didCancel) {
            setLoading(false)
            // alert('User cancelled camera picker');
            return;
         } else if (response.errorCode == 'camera_unavailable') {
            setLoading(false)
            alert('Camera not available on device');
            return;
         } else if (response.errorCode == 'permission') {
            setLoading(false)
            alert('Permission not satisfied');
            return;
         } else if (response.errorCode == 'others') {
            setLoading(false)
            alert(response.errorMessage);
            return;
         }
         uploadImage(response.assets[0].uri, response.assets[0].fileName)
         console.log(response.assets[0])
      });
   };
   const uploadImage = async (flag, fileName) => {
      //   const file=fileName.toString().slice(25,32)
      const reference = storage().ref(`/Trending/${fileName}`)
      // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/food.png`;
      const pathToFile = flag.toString()
      // uploads file
      await reference.putFile(pathToFile)
         .then(async () => {
            console.log('Uploaded')
            const url = await reference.getDownloadURL()
            if (url) {
               console.log(url)
               setImage(url)
               setLoading(false)
            }
         }).catch(err => {
            console.log(err)
            setLoading(false)
         })
   }
   const add = () => {
      if (detail !== '' && offer !== '' && image !== '') {
         firestore().collection('Trending')
            .add({
               detail: detail,
               image_url: image,
               offer: offer,
            }).then(() => {
               setImage('')
               setDetail('')
               setOffer('')
               setTap(false)
               alert('Successfully added')
            }).catch(err => {
               console.log(err)
            })
      } else {
         alert('Fill all creds')
      }
   }
   return (
      <View style={styles.cont}>
         <Header title="Update Trendings" />
         <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 30 }}>
               {trending.length > 0 ?
                  trending.map(item => <TrendingCard data={item} key={item.id} />)
                  : <Text>No Trendings found</Text>}
            </View>
            <View style={{ marginVertical: 20 }}>
               <CustomButton title={tap?"Close":"Add"} press={() => setTap(!tap)} />
            </View>
            {
               tap &&
               <View style={{ width: '100%', marginBottom: '30%' }}>
                  <TouchableOpacity style={styles.btn} onPress={chooseFile}>
                     {loading?<ActivityIndicator size='large' color={Colors.inProgress}/>:
                        image !== '' ? <Image source={{ uri: image }} style={{ width: '80%', height: 100, resizeMode: 'contain' }} />
                           : <Icon size={30} color={Colors.primary} name="upload" />
                     }
                  </TouchableOpacity>
                  <CustomInput
                     label="Details"
                     onChangeText={(e) => setDetail(e)}
                  />
                  <CustomInput
                     label="Offer"
                     onChangeText={(e) => setOffer(e)}
                  />
                  <View style={{ marginVertical: 20 }}>
                     <CustomButton title="Submit" press={() => {
                        add()
                     }} />
                  </View>
               </View>
            }
         </ScrollView>


      </View>
   )
}

export default UpdateTrendings

const styles = StyleSheet.create({
   cont: {
      flex: 1,
      backgroundColor: '#fff'
   }, btn: {
      width: '30%',
      borderWidth: 1,
      borderColor: Colors.primary,
      padding: 30,
      borderRadius: 5,
      alignSelf: 'center', alignItems: 'center'
   }
})