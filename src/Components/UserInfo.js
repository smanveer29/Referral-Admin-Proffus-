var RNFS=require('react-native-fs');
import { ScrollView, StyleSheet, Text, View ,PermissionsAndroid} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../Helper/Colors'
import Header from '../Helper/Header'
import firestore from '@react-native-firebase/firestore';
import LeadsCard from './LeadsCard';
import CustomButton from './CustomButton';
import {writeFile,DocumentDirectoryPath,DownloadDirectoryPath,ExternalStorageDirectoryPath} from 'react-native-fs';
import XLSX from 'xlsx';
// var RNFS =require('react-native-fs');
import RNHTMLtoPDF from 'react-native-html-to-pdf';
const DDP=DownloadDirectoryPath+'/'
const UserInfo = ({ route }) => {
   const [leads, setLeads] = useState(0)
   const [reffer, setReffer] = useState([])
   const user = route.params.data
   
   useEffect(() => {
      if (user) {
         // firestore().collection('users')
         //    .doc(user.id).collection('Leads')
         //    .onSnapshot(e => e.docs.map(doc => setLeads(doc.data().total)))
         firestore().collection('Leads')
            .where('user_id', '==', user.id)
            .onSnapshot(e => setLeads(e.docs.length))

         firestore().collection('Leads')
            .where('user_id', '==', user?.id)
            .onSnapshot(e => setReffer(e.docs.map(doc => ({ ...doc.data(), id: doc.id }))))
      }
   }, [user])
   console.log(reffer)
   const exportPdf = async () => {
      // Created Sample data
      let sample_data_to_export = reffer;
      const path = DDP + `${user.name}_leads.xlsx`;
      let ws = XLSX.utils.json_to_sheet(sample_data_to_export)    
      let wb = XLSX.utils.book_new();
      await XLSX.utils.book_append_sheet(wb,ws,"Leads")
      const wbout = await XLSX.write(wb, {type:'binary', bookType:"xlsx"});
  
      // Write generated excel to Storage
      // RNFS.writeFile(RNFS.ExternalStorageDirectoryPath + '/my_exported_file.xlsx', wbout, 'ascii')
      await writeFile(path,wbout, 'ascii')
      .then((res)=>{
         alert("Your File has been Downloaded to Download Folder")
       console.log('Success',res);
      }).catch((e)=>{
        console.log('Error', e);
        alert('Internal Error Please Try Again Later')
      });
      // let options = {
      //    html: '<h1>PDF TEST</h1>',
      //    fileName: 'fafafafaf',
      //    directory: 'Download',
      //  };
   
      //  let file = await RNHTMLtoPDF.convert(options)
      //  console.log(file)
      //  alert(file.filePath);
    }
    const handleClick = async () => {
      try{
        // Check for Permission (check if permission is already given or not)
        let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if(!isPermitedExternalStorage){
          // Ask for permission
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "Storage permission needed",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
   
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Permission Granted (calling our exportPdf function)
            if(reffer.length > 0){
               exportPdf()
            }
            else {
               alert('Nothing To download')
            }
            console.log("Permission granted");
          } else {
            // Permission denied
            await PermissionsAndroid.request(
               PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
               {
                 title: "Storage permission needed",
                 buttonNeutral: "Ask Me Later",
                 buttonNegative: "Cancel",
                 buttonPositive: "OK"
               }
            )
            console.log("Permission denied");
          }
        }else{
           // Already have Permission (calling our exportPdf function)
           if(reffer.length > 0){
            exportPdf()
         }
         else {
            alert('Nothing To download')
         }
        }
      }catch(e){
        console.log('Error while checking permission');
        console.log(e);
        return
      }
      
    };
   return (
      <View style={styles.cont}>
         <Header title={user.name} />
         <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'center', backgroundColor: '#F5ECFB', paddingVertical: 30, margin: 20, borderRadius: 20, elevation: 5 }}>
               {/* <Image source={require('../../Assets/Images/idCard.png')} /> */}
               <Text style={{ ...styles.text, color: 'black', letterSpacing: 3, textTransform: 'uppercase', paddingBottom: 20, borderBottomWidth: 0.6, borderColor: '#c8c8c8', width: '100%', textAlign: 'center' }}>{user.name}</Text>
               <View style={{ paddingVertical: 20 }}>
                  <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: 'bold', paddingVertical: 5 }}>PARTNER ID : {user?.id}</Text>
                  <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: 'bold', paddingVertical: 5 }}>PHONE : {user?.phoneNumber}</Text>
                  <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: 'bold', paddingVertical: 5 }}>E-MAIL : {user.email ? user?.email : 'lorem.ipsum@gmail.com'}</Text>
                  <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: 'bold', paddingVertical: 5 }}>ADDRESS : New Delhi</Text>
               </View>
            </View>

            <View style={{ margin: 10, borderTopWidth: 1, borderColor: '#c8c8c8',paddingVertical:20}}>
               <View style={{ flexDirection: 'row',flex:1 }}>
                  <View style={{ borderWidth: 1, padding: 10, borderColor: Colors.primary, borderRadius: 15, flex:0.5,marginHorizontal:3}}>
                     <Text style={{ color: 'black', fontSize: 18, fontWeight: '900' }}>{leads && leads}</Text>
                     <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Total Leads</Text>
                  </View>
                  <View style={{ borderWidth: 1, padding: 10, borderColor: Colors.primary, borderRadius: 15, flex:0.5,marginHorizontal:3 }}>
                     <Text style={{ color: 'black', fontSize: 18, fontWeight: '900' }}>{`20%`}</Text>
                     <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Commision Earned</Text>
                  </View>
               </View>

               <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', marginVertical: 20,marginHorizontal:15 }}>Reffered</Text>
               <View style={{marginBottom:30}}>
               {reffer.length > 0 &&
                  reffer.map(item => <LeadsCard key={item.id} item={{ ...item, user }} report={true} />)}
               </View>
            </View>
            <View style={{marginBottom:'30%',marginHorizontal:20}}>
            <CustomButton title="Download" press={handleClick}/>
               </View>
         </ScrollView>
      </View>
   )
}

export default UserInfo

const styles = StyleSheet.create({
   cont: {
      flex: 1,
      backgroundColor: '#fff'
   }
})