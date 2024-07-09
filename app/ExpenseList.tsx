import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from "../firebaseConfig";
import EmptyList from '@/components/EmptyList';
import Header from '@/components/Header';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ExpenseCard from '@/components/ExpenseCard';
import { collection, getDocs, query } from 'firebase/firestore';

type Expense = {
  id:string,
  title:string,
  amount:string,
  desc:string
}

const Dummy = [
  {
    id:1, 
    title:"Lunch Break",
    amount:50000,
    desc:"For Lunch Break",
  },
  {
    id:2, 
    title:"Clothes",
    amount:500000,
    desc:"Clothes Shopping",
  },
  {
    id:3, 
    title:"Food",
    amount:50000,
    desc:"Yes, food is delicious",
  },
  {
    id:4, 
    title:"Hobby",
    amount:250000,
    desc:"Game is so fun",
  },

]
const ExpenseList = () => {
  const [sum, setSum] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
    try {
      const q = query(collection(db, 'expenses'));
      const querySnapshot = await getDocs(q);
      const expensesArray : Expense[] = [];
      let total = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<Expense, 'id'>
        const expense: Expense = {id: doc.id, ...data};
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
      <View>
        <Text>{sum}</Text>
      </View>
      <FlatList
      data={expenses}
      ListEmptyComponent={<EmptyList messages="Your List's Empty :("/>}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <ExpenseCard item={item}/>}
      />
    </GestureHandlerRootView>
  )
}

export default ExpenseList