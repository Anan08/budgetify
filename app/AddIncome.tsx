import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { db } from "../firebaseConfig";
import Header from '@/components/Header';
import { collection, addDoc } from 'firebase/firestore';

const AddIncome = () => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [desc, setDesc] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, seAalertMessage] = useState('');
    const [alertImage, setAlertImage] = useState(null);
    
    const handleIncome = async () => {
        //if title && amount === '' == false
        if(title === '' || amount === '') {
            Alert.alert("Form Shouldn't be Empty");
        } else {
            try {
                let doc = await addDoc(collection(db, 'income'), {
                    title,
                    amount,
                    desc,
                })
                Alert.alert("Income successfully Added")
                setTitle('');
                setAmount('');
                setDesc('');
                
            } catch (error) {
                Alert.alert("Error Adding Income");
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
                    placeholder='Put your Income title'
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
                    placeholder='Desc?'
                    />
                </View>
                <View style={{marginTop:40}}>
                    <TouchableOpacity 
                    style={{width:300, display:'flex', alignItems:'center', backgroundColor:'#62B865', padding:10, borderRadius:30}}
                    onPress={handleIncome}>
                        <Text style={{color:'white', fontWeight:'bold'}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        
    </GestureHandlerRootView>
    


  )
}

export default AddIncome