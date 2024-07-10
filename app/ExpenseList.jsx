import { View, Text, Alert, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Header from '../components/Header'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { db } from '../firebaseConfig'
import { getDocs, where, collection } from 'firebase/firestore'
import EmptyList from '../components/EmptyList'
import ExpenseCard from '../components/ExpenseCard'

const ExpenseList = () => {
    
    const [expenses, setExpenses] = useState([])
    const {folderId} = useLocalSearchParams();
    console.log(folderId);

    const fetchExpenses = async() => {
        try {
            let doc = await getDocs(collection(db, 'expenses'), where('folderId', '==', folderId));
            const expensesArray = [];
            doc.forEach((doc) => {
                const data = doc.data();
                const expense = {id: doc.id, ...data};
                expensesArray.push(expense);
            });
            setExpenses(expensesArray);
        } catch (error) {
            Alert.alert('error fetching data');
            console.log(error);
        }
        

    }

    useEffect(() => {
        fetchExpenses();
    }, []);

  return (
    <GestureHandlerRootView>
        <Header/>
        <FlatList
        data={expenses}
        ListEmptyComponent={<EmptyList messages="Your List's Empty :("/>}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <ExpenseCard item={item}/>}
        />
    </GestureHandlerRootView>
  )
}

export default ExpenseList