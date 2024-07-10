import { View, Text, Alert, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { router } from 'expo-router';
import Header from '@/components/Header';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomRadioButton from '../components/CustomRadioButton';

const buttonValue = [
  {value : 'expenses'},
  {value : 'incomes'},
]

const AddFolder = () => {
  
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');

  const handleFolders = async() => {
    if (title === '' || type === '') {
      Alert.alert('form shouldnt be empty');
    } else {
      try {
        currentDate = new Date();
        let doc = await addDoc(collection(db, 'folders'), {
          title,
          type,
          date : currentDate
        })
        setTitle('');
        setType('');
        router.back();
      
      } catch (error) {
        Alert.alert('error adding folders')
      }
    }
  }

  return (
    <GestureHandlerRootView>
      <ScrollView>
          <Header/>
          <View style={{display:'flex', justifyContent:'center', alignItems:'center', margin:20}}>
            <View>
              <Image source={require('../assets/images/finance.png')} style={{width:200, height:200}}/>
            </View>
            <View style={{marginTop:20}}>
              <Text style={{fontSize:18, marginBottom:10, marginTop:10, fontWeight:'bold'}}>Title</Text>
              <TextInput
                value={title}
                onChangeText={(value) => {setTitle(value);
                }}
                style={{borderWidth:0.1, borderRadius:30, backgroundColor:'#ff0ff', width:300, padding:10 }}
                placeholder='Put your Folders title'
              />                                        
            </View>
            <View style={{marginTop:20}}>
              
              <Text style={{fontSize:18, marginBottom:10, marginTop:10, fontWeight:'bold'}}>Type</Text>
              <View>
                <CustomRadioButton
                data={buttonValue}
                onSelect={(value) => {setType(value)}}/>
              </View>
              
            </View>
            <View style={{marginTop:40}}>
              <TouchableOpacity 
                style={{width:300, display:'flex', alignItems:'center', backgroundColor:'#62B865', padding:10, borderRadius:30}}
                onPress={handleFolders}
              >
                <Text style={{color:'white', fontWeight:'bold'}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default AddFolder