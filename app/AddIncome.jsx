import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import React from 'react';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { db } from "../firebaseConfig";
import Header from '@/components/Header';
import { collection, addDoc } from 'firebase/firestore';
import CustomRadioButton from '@/components/CustomRadioButton';

const AddIncome = () => {

    const navigation = useNavigation();
    const { folderId } = useLocalSearchParams();
    console.log(folderId);

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleIncome = async () => {
        if(title === '' || amount === '' || category == '') {
            Alert.alert("Form shouldn't be empty")
        } else {
            try {
                const currentDate = new Date();
                const numericAmount = parseFloat(amount);

                let doc = await addDoc(collection(db, 'incomes', folderId, 'data'), {
                    title : title,
                    amount : numericAmount,
                    category : category,
                    description : description,
                    date : currentDate
                })
                setTitle('');
                setAmount('');
                setDescription('');
                setCategory('');
                Alert.alert('adding income success');
                navigation.navigate('IncomeList', {folderId : folderId});
                
            } catch (error) {
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
                    <Image source={require('../assets/images/line-graph.png')} style={{width:200, height:200}}/>
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
                    value={description}
                    onChangeText={(value) => {setDescription(value)}}
                    style={{borderWidth:0.1, borderRadius:30, backgroundColor:'#fffff', width:300, padding:10 }}
                    onChange={() => {
                        
                    }}
                    placeholder='Description'
                    />
                </View>
                <View>
                    <Text style={{fontSize:18, marginBottom:10, marginTop:10, fontWeight:'bold'}}>Type</Text>
                    <CustomRadioButton
                        label="salary"
                        selected={category === "salary"}
                        onSelect={() => setCategory('salary')}/>
                    <CustomRadioButton
                        label="investment"
                        selected={category === "investment"}
                        onSelect={() => setCategory('investment')}/>
                    <CustomRadioButton
                        label="other"
                        selected={category === "other"}
                        onSelect={() => setCategory('other')}/>
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