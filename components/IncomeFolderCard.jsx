import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import randomImage from '@/assets/images/randomImage'
import { deleteDoc } from 'firebase/firestore'
import { useNavigation } from 'expo-router'
import { incomesRef } from '@/firebaseConfig'

const IncomeFolderCard = ({item}) => {

  const navigation = useNavigation();
    
    const handleDelete = async () => {
        try {
          await deleteDoc(incomesRef, item.id);
          Alert.alert('Folder deleted successfully');
          navigation.navigate('index')
        } catch (error) {
          Alert.alert('deleting Folder error');
        }
      }
    
      const handleEdit = () => {
        navigation.navigate('EditIncome', {folderId : item.id})
      }

      const handleOpenFolder = () => {
        navigation.navigate('IncomeList', {folderId : item.id});
      }
  return (
    <>
      <View style={{alignItems:'center'}}>
          <TouchableOpacity 
          style={{display:'flex', justifyContent:'center', height: 200, width:200, margin:20, backgroundColor:'#F7F7F7', alignItems:'center', borderRadius:30}}
          onPress={handleOpenFolder}>
              <Image source={randomImage()} style={{height:100, width: 100}}/>
              <Text style={{fontSize:15, fontWeight:'bold', margin:5}}>{item.title}</Text>
              <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', gap:20}}>
                <View style={{display:'flex',alignItems:'center', justifyContent:'space-evenly'}}>
                  <TouchableOpacity style={{ padding:10, zIndex:2}}
                  onPress={handleEdit}>
                    <Ionicons name='create-outline' size={20}/>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity style={{ padding:10, zIndex:2}}
                  onPress={handleDelete}>
                    <Ionicons name='trash-outline' size={20}/>
                  </TouchableOpacity>
                </View>
              </View>

          </TouchableOpacity>
      </View>
    </>
  )
}

export default IncomeFolderCard