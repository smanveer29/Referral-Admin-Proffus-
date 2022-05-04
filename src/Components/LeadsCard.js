import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../Helper/Colors'
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown'
import CustomButton from '../Components/CustomButton'
import firestore from '@react-native-firebase/firestore';

const status = ["verified", "in progress", "rejected","pending"]
const LeadsCard = ({ item, report, edit }) => {
    const navigation = useNavigation()
    const [tap, setTap] = useState(false)
    const [selected, setSelected] = useState('')

    const update=()=>{
        firestore().collection('Leads').doc(item.id).set({
            status:selected
        },{merge:true}).then(()=>{
            setTap(!tap)
            alert('Updated Successfully')
        })
        .catch(e=>console.log(e))

    }
    return (
        <TouchableOpacity style={edit ? { ...styles.leadCard, } : { ...styles.leadCard, flexDirection: 'row', alignItems: 'center' }} onPress={
            () => {
                !report && !edit && navigation.navigate('UserInfo', { data: item })
                edit && setTap(!tap)
            }
        }>
            <View style={{ flex: 0.6, flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome size={18} name={"user-o"} color={Colors.primary} />
                <Text style={{
                    ...styles.text, paddingHorizontal: 10,
                    marginHorizontal: 10,
                    borderLeftWidth: 1,
                    borderColor: '#c8c8c8'
                }}>{item.name ? item?.name : item?.customer_name}{`\n\n`}+91 {item.phoneNumber ? item.phoneNumber : item.mobile_number}</Text>
            </View>

            {report || edit &&
                <View style={{ alignItems: 'center', backgroundColor: item.status === 'verified' && Colors.verified || item.status === 'all' && Colors.all || item.status === 'in progress' && Colors.inProgress || item.status === 'rejected' && Colors.rejected, flex: 0.4, borderRadius: 5 }}>
                    <Text style={{ ...styles.text, fontSize: 12 }}>{item.status}</Text>
                </View>
            }
            {!report && !edit &&
                <View style={{ position: 'absolute', right: 10, }}>
                    <FontAwesome size={13} color={Colors.primary} name="chevron-right" />
                </View>
            }
            {edit && <View style={{ position: 'absolute', right: 10, top: 10 }}>
                <Icon size={23} color={Colors.primary} name="edit" />
            </View>}

            {tap &&
                <View style={{ padding: 10 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Change Status</Text>
                    
                    <SelectDropdown
                                data={status}
                                renderDropdownIcon={() => <FontAwesome name="angle-down" size={20} color={Colors.primary} />}
                                buttonStyle={{
                                    backgroundColor: 'transparent', width: '100%', borderBottomWidth: 1, borderColor: Colors.primary,
                                }}
                                buttonTextStyle={{ textAlign: 'left',textTransform: 'capitalize'}}
                                rowTextStyle={{textTransform: 'capitalize'}}
                                defaultButtonText="Change leads Status"
                                defaultValue="Choose Delivery Status"
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem)
                                    setSelected(selectedItem)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />
                            {
                                selected!=='' && <CustomButton title="Update" press={update}/>
                            }
                                
                        
                </View>
            }
        </TouchableOpacity>
    )
}

export default LeadsCard

const styles = StyleSheet.create({
    leadCard: {
        flex: 1,
        width: '90%',
        padding: 14,
        backgroundColor: '#fff',
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 0.7,
        borderColor: Colors.primary,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
    }, text: {
        color: 'black',
        textTransform: 'capitalize', paddingVertical: 4
    }
})