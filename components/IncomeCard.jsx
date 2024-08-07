import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { db } from '@/firebaseConfig'
import { deleteDoc, doc } from 'firebase/firestore'
import { useNavigation } from 'expo-router'


const IncomeCard = ({item, folderId}) => {

  const navigation = useNavigation();
  
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'incomes', item.id));
      Alert.alert('income deleted successfully');
      navigation.navigate('IncomeList', {id : item.id, folderId})
    } catch (error) {
      Alert.alert('deleting expense error');
    }
  }
  
  const handleEdit = () => {
    navigation.navigate('IncomeEdit', {incomeId : item.id, folderId})
  }
  
  const handleDetail = () => {
    navigation.navigate('IncomeDetail', {incomeId : item.id, folderId})
  }
  return (
    <>
      <View>
          <TouchableOpacity
          onPress={handleDetail} 
          style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10, padding:10, borderWidth:0.1, borderRadius:30, height:50, zIndex:0}}>
              <Text style={{fontSize:15, fontWeight:'bold', margin:5}}>{item.title}</Text>
              <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', gap:20}}>
                <Text style={{fontSize:15, fontWeight:'bold', margin:5, color:'green'}}>{item.amount}</Text>
                <View>
                  <TouchableOpacity style={{ paddingTop:3, zIndex:2}}
                  onPress={handleEdit}>
                    <Ionicons name='create-outline' size={20}/>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity style={{ paddingTop:4, paddingRight:2, zIndex:2}}
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

export default IncomeCard