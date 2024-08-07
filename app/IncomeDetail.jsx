import { View, Text, Alert, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { doc, getDoc, collection, } from 'firebase/firestore'
import { incomesRef } from '../firebaseConfig'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'


const IncomeDetail = () => {

    const navigation = useNavigation();
    const [income, setIncome] = useState({});

    const { incomeId, folderId } = useLocalSearchParams();
    console.log(incomeId, folderId);


    const fetchIncome = async () => {
        try {
            const incomeDataRef = doc(incomesRef, folderId, 'data', incomeId);
            const incomeDataSnap = await getDoc(incomeDataRef)
            setIncome(incomeDataSnap.data());
            console.log(income);

            
        } catch (error) {
            console.log(error);
        }  
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate();
        return date.toLocaleDateString('en-US');
    }

    useEffect(() => {
        fetchIncome();
    }, []);

    return (
        
        <GestureHandlerRootView>
            <ScrollView>
            <View style={{margin:20, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('ExpenseList', {folderId});
                }}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>Budgetify </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={{}}
                onPress={() => {
                    navigation.navigate('IncomeEdit', {incomeId, folderId})
                }}>
                    <Ionicons name='create-outline' size={20}/>
                </TouchableOpacity>
            </View>
            <View style={{justifyContent:'center', display:'flex', alignItems:'center', margin:20, }}>
                <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Income Detail</Text>
                <Image source={require('../assets/images/growth.png')} style={{height:100, width:100}}/>
            </View>
            <View style={{display:'flex', justifyContent:'center', alignItems:'center', margin:20}}>
                <View style={{display:'flex', width:300, height:50, marginBottom:40}}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Title</Text>
                    <View style={{borderWidth:0.1, backgroundColor:'#f7f7f7', borderRadius:30, height:40, padding:10, }}>
                        <Text style={{fontSize:15, fontWeight:'400', borderWidth:0.1, paddingLeft:5}}>{income.title}</Text>
                    </View>
                    
                </View>
                <View style={{display:'flex', width:300, height:50, marginBottom:40}}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Amount</Text>
                    <View style={{borderWidth:0.1, backgroundColor:'#f7f7f7', borderRadius:30, height:40, padding:10, }}>
                        <Text style={{fontSize:15, fontWeight:'400', borderWidth:0.1, paddingLeft:5}}>{income.amount}</Text>
                    </View>
                    
                </View>
                <View style={{display:'flex', width:300, height:50, marginBottom:40}}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Description</Text>
                    <View style={{borderWidth:0.1, backgroundColor:'#f7f7f7', borderRadius:30, height:40, padding:10, }}>
                        <Text style={{fontSize:15, fontWeight:'400', borderWidth:0.1, paddingLeft:5}}>{income.description}</Text>
                    </View>
                    
                </View>
                <View style={{display:'flex', width:300, height:50, marginBottom:40}}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Category</Text>
                    <View style={{borderWidth:0.1, backgroundColor:'#f7f7f7', borderRadius:30, height:40, padding:10, }}>
                        <Text style={{fontSize:15, fontWeight:'400', borderWidth:0.1, paddingLeft:5}}>{income.category}</Text>
                    </View>
                    
                </View>
                <View style={{display:'flex', width:300, height:50, marginBottom:40}}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Date</Text>
                    <View style={{borderWidth:0.1, backgroundColor:'#f7f7f7', borderRadius:30, height:40, padding:10, }}>
                        <Text style={{fontSize:15, fontWeight:'400', borderWidth:0.1, paddingLeft:5}}>{formatDate(income.date)}</Text>
                    </View>
                    
                </View>
            </View>
            </ScrollView>
        </GestureHandlerRootView>
  )
}

export default IncomeDetail