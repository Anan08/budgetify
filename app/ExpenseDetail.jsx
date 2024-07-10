import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { doc, getDoc, collection, } from 'firebase/firestore'
import db from '../firebaseConfig'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Header from '@/components/Header'

const ExpenseDetail = () => {

    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [expense, setExpense] = useState({});

    const { expenseId, folderId } = useLocalSearchParams();
    console.log(expenseId, folderId);


    const fetchExpenses = async () => {
        try {
            const expenseDataRef = doc(db,'expenses', folderId, 'data', expenseId);
            const expenseDataSnap = await getDoc(expenseDataRef)
            setExpense(expenseDataSnap);
                

            
        } catch (error) {
            console.log(error);
        }  
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        
        <GestureHandlerRootView>
            <Header/>
            <View>
                <Text>{expense.title}</Text>
            </View>
            <View>
                <Text>{expense.amount}</Text>
                
            </View>
        </GestureHandlerRootView>
  )
}

export default ExpenseDetail