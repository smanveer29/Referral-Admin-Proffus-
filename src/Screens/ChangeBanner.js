import { StyleSheet, Text, View, ActivityIndicator, Image,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../Helper/Header'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../Helper/Colors'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import CustomButton from '../Components/CustomButton'
import { launchImageLibrary } from 'react-native-image-picker'
const ChangeBanner = () => {
   const navigation = useNavigation()
   const [banners, setBanners] = useState([])
   const [loading, setLoading] = useState(true)
   useEffect(() => {
      firestore().collection('Banners')
         .onSnapshot(e => {
            setBanners(e.docs.map(docs => ({ ...docs.data(), id: docs.id })))
            setLoading(false)
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
      const reference = storage().ref(`/banners/${fileName}`)
      // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/food.png`;
      const pathToFile = flag.toString()
      // uploads file
      await reference.putFile(pathToFile)
         .then(async () => {
            console.log('Uploaded')
            const url = await reference.getDownloadURL()
            if (url) {
               console.log(url)
               firestore().collection('Banners')
                  .add({
                     image_url: url
                  })
                  .then(() => {
                     setLoading(false)
                  }).catch(err => { console.log(err) })
            }
         }).catch(err => {
            console.log(err)
            setLoading(false)
         })
   }
   const remove = (flag) => {
      firestore().collection('Banners')
      .doc(flag).delete().then(res=>{
         console.log(res)
         alert('Banners deleted')
      }).catch(e=>{ console.log(e)})
   }
   return (
      <View style={styles.cont}>
         <Header title="Change Banner" />
         <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
         {
            loading ? <ActivityIndicator size="large" color={Colors.primary} />
               :
               banners.length > 0 ?
                  <View style={styles.banner}>
                     {banners.map(item =>
                     <View style={{ width: '30%',marginHorizontal: 5,marginVertical:5 }} key={item.id}>
                        <Image source={{ uri: item.image_url }} style={{width:'100%',height:100}}  />
                        <CustomButton title="Remove" press={()=>remove(item.id)}/>
                     </View>
                     )}
                  </View>
                  :
                  <Text>Non banners Found</Text>
         }
         </ScrollView>
         <View style={{ marginHorizontal: 20 }}>
            <CustomButton title="Add Banner" press={chooseFile} />
         </View>
      </View>
   )
}

export default ChangeBanner

const styles = StyleSheet.create({
   cont: {
      flex: 1,
      backgroundColor: '#fff'
   },
   banner: {
      flexWrap: 'wrap', flexDirection: 'row', width: '100%', marginHorizontal: 5, marginVertical: 30
   }
})