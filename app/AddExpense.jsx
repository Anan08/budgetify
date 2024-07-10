import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import Header from '@/components/Header'
import CustomAlert from '@/components/CustomAlert'
import { db } from '@/firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'

const AddExpense = () => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date());
    const [folderId, setFolderId] = useState('');    

    const handleExpense = async () => {
        if(title === '' || amount === '') {
            Alert.alert("Form shouldn't be empty")
        } else {
            try {
                const currentDate = new Date();
                const numericAmount = parseFloat(amount);
                setDate(currentDate);

                let doc = await addDoc(collection(db, 'expenses'), {
                    title : title,
                    amount : numericAmount,
                    category : 'food',
                    desc : desc,
                    folderId : 'B5Ylj4W88FMaC6Tnmcu4',
                    date : currentDate
                })
                setTitle('');
                setAmount('');
                setDesc('');
                setFolderId('');
                setCategory('');
                router.back();
                
            } catch (error) {
                
            }
        }
    }

  return (
    <GestureHandlerRootView>
        <ScrollView>
            <Header/>
            <View style={{display:'flex', justifyContent:'center', alignItems:'center', margin:20}}>
                <View>
                    <Image source={require('../assets/images/finance (2).png')} style={{width:200, height:200}}/>
                </View>
                <View style={{marginTop:20}}>
                    
                    <Text style={{fontSize:18, marginBottom:10, marginTop:10, fontWeight:'bold'}}>Title</Text>
                    <TextInput
                    value={title}
                    onChangeText={(value) => {setTitle(value);
                    }}
                    style={{borderWidth:0.1, borderRadius:30, backgroundColor:'#ff0ff', width:300, padding:10 }}
                    placeholder='Put your expense title'
                    />
                    
                    <Text style={{fontSize:18, marginBottom:10, marginTop:10, fontWeight:'bold'}}>Amount</Text>
                    <TextInput
                    value={amount}
                    onChangeText={(value) => {setAmount(value);
                    }}
                    style={{borderWidth:0.1, borderRadius:30, backgroundColor:'#ff0ff', width:300, padding:10 }}
                    placeholder='Type your amount'
                    keyboardType='numeric'
                    />
                    
                    <Text style={{fontSize:18, marginBottom:10, marginTop:10, fontWeight:'bold'}}>Desc</Text>
                    <TextInput
                    value={desc}
                    onChangeText={(value) => {setDesc(value)}}
                    style={{borderWidth:0.1, borderRadius:30, backgroundColor:'#fffff', width:300, padding:10 }}
                    onChange={() => {
                        
                    }}
                    placeholder='Description'
                    />
                </View>
                <View style={{marginTop:40}}>
                    <TouchableOpacity 
                    style={{width:300, display:'flex', alignItems:'center', backgroundColor:'#62B865', padding:10, borderRadius:30}}
                    onPress={handleExpense}>
                        <Text style={{color:'white', fontWeight:'bold'}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>


        
    </GestureHandlerRootView>    
  )
}

export default AddExpense