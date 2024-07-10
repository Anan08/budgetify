import { View, Text, Alert, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { expensesRef, incomesRef } from '@/firebaseConfig';
import { useNavigation } from 'expo-router';
import Header from '@/components/Header';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomRadioButton from '../components/CustomRadioButton';


const AddFolder = () => {

  const navigation = useNavigation();
  
  const [title, setTitle] = useState('');
  const [type, setType] = useState('')

  const handleFolders = async () => {
    if (title === '' || type === '') {
      Alert.alert('form shouldnt be empty');
    } else if (type === 'incomes'){
      try {
        currentDate = new Date();
        let doc = await addDoc(incomesRef, {
          title,
          date : currentDate
        })
        setTitle('');
        setType('');
        Alert.alert('adding incomes folder success');
        navigation.navigate('index');
      
      } catch (error) {
        Alert.alert('error adding folders');
        console.log(error);
      }
    } else {
      try {
        currentDate = new Date();
        let doc = await addDoc(expensesRef, {
          title,
          date : currentDate
        })
        setTitle('');
        setType('');
        Alert.alert('adding expenses folder success');
        navigation.navigate('index');
      
      } catch (error) {
        Alert.alert('error adding folders')
        console.log(error);
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
            </View>
            <View>
              <CustomRadioButton
                  label="expenses"
                  selected={type === "expenses"}
                  onSelect={() => setType('expenses')}/>
              <CustomRadioButton
                  label="incomes"
                  selected={type === "incomes"}
                  onSelect={() => setType('incomes')}/>
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