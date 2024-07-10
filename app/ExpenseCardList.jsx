import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { expensesRef } from "../firebaseConfig";
import EmptyList from '@/components/EmptyList';
import Header from '@/components/Header';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ExpenseFolderCard from '@/components/ExpenseFolderCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const ExpenseCardList = () => {
  const [sum, setSum] = useState(0);
  const router = useRouter();
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {

      const querySnapshot = await getDocs(expensesRef);
      const expensesArray = [];
      let total = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const expense = {id: doc.id, ...data};
        expensesArray.push(expense);
        total += parseFloat(expense.amount);
      });
      setExpenses(expensesArray);
      setSum(total);
    } catch (error) {
      Alert.alert('Error fetching expenses')
    }
  };


  useEffect(() => {
    fetchExpenses();
  }, [])



  return (
    <GestureHandlerRootView>
      <Header/>
      {/* <View style={{display:'flex', alignItems:'center', padding:10, backgroundColor:'#E7E7E7', margin:20, borderRadius:30}}>
        <Text style={{fontSize:15, fontWeight:'600', margin:20}}>Your total Outcome</Text>
        <Text style={{fontSize:15, fontWeight:'600', margin:5}}>Rp.{sum}</Text>
      </View> */}
      
      <FlatList
      data={expenses}
      ListEmptyComponent={<EmptyList messages="Your List's Empty :("/>}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <ExpenseFolderCard item={item}/>}
      />
    </GestureHandlerRootView>
  )
}

export default ExpenseCardList