import { View, Text, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { doc, getDoc, collection, } from 'firebase/firestore'
import { db, expensesRef } from '../firebaseConfig'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import Header from '@/components/Header'

const ExpenseDetail = () => {

    const [expense, setExpense] = useState({});

    const { expenseId, folderId } = useLocalSearchParams();
    console.log(expenseId, folderId);


    const fetchExpenses = async () => {
        try {
            const expenseDataRef = doc(expensesRef, folderId, 'data', expenseId);
            const expenseDataSnap = await getDoc(expenseDataRef)
            setExpense(expenseDataSnap.data());
            console.log(expense);

            
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
        fetchExpenses();
    }, []);

    return (
        
        <GestureHandlerRootView>
            <ScrollView>
            <Header/>
            <View style={{justifyContent:'center', display:'flex', alignItems:'center', margin:20, }}>
                <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Expense Detail</Text>
                <Image source={require('../assets/images/payment.png')} style={{height:100, width:100}}/>
            </View>
            <View style={{display:'flex', justifyContent:'center', alignItems:'center', margin:20}}>
                <View style={{display:'flex', width:300, height:50, marginBottom:40}}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Title</Text>
                    <View style={{borderWidth:0.1, backgroundColor:'#f7f7f7', borderRadius:30, height:40, padding:10, }}>
                        <Text style={{fontSize:15, fontWeight:'400', borderWidth:0.1, paddingLeft:5}}>{expense.title}</Text>
                    </View>
                    
                </View>
                <View style={{display:'flex', width:300, height:50, marginBottom:40}}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Amount</Text>
                    <View style={{borderWidth:0.1, backgroundColor:'#f7f7f7', borderRadius:30, height:40, padding:10, }}>
                        <Text style={{fontSize:15, fontWeight:'400', borderWidth:0.1, paddingLeft:5}}>{expense.amount}</Text>
                    </View>
                    
                </View>
                <View style={{display:'flex', width:300, height:50, marginBottom:40}}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Description</Text>
                    <View style={{borderWidth:0.1, backgroundColor:'#f7f7f7', borderRadius:30, height:40, padding:10, }}>
                        <Text style={{fontSize:15, fontWeight:'400', borderWidth:0.1, paddingLeft:5}}>{expense.description}</Text>
                    </View>
                    
                </View>
                <View style={{display:'flex', width:300, height:50, marginBottom:40}}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Category</Text>
                    <View style={{borderWidth:0.1, backgroundColor:'#f7f7f7', borderRadius:30, height:40, padding:10, }}>
                        <Text style={{fontSize:15, fontWeight:'400', borderWidth:0.1, paddingLeft:5}}>{expense.category}</Text>
                    </View>
                    
                </View>
                <View style={{display:'flex', width:300, height:50, marginBottom:40}}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Date</Text>
                    <View style={{borderWidth:0.1, backgroundColor:'#f7f7f7', borderRadius:30, height:40, padding:10, }}>
                        <Text style={{fontSize:15, fontWeight:'400', borderWidth:0.1, paddingLeft:5}}>{formatDate(expense.date)}</Text>
                    </View>
                    
                </View>
            </View>
            </ScrollView>
        </GestureHandlerRootView>
  )
}

export default ExpenseDetail