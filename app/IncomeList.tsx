import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from "../firebaseConfig";
import EmptyList from '@/components/EmptyList';
import Header from '@/components/Header';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ExpenseCard from '@/components/ExpenseCard';
import { collection, getDocs, query } from 'firebase/firestore';
import TotalSum from '@/components/TotalSum';
import IncomeCard from '@/components/IncomeCard';

type Income = {
  id:string,
  title:string,
  amount:string,
  desc:string
}

const IncomeList = () => {
  const [sum, setSum] = useState(0);
  const [incomes, setIncome] = useState<Income[]>([]);

  const fetchExpenses = async () => {
    try {
      const q = query(collection(db, 'income'));
      const querySnapshot = await getDocs(q);
      const incomeArray : Income[] = [];
      let total = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<Income, 'id'>
        const expense: Income = {id: doc.id, ...data};
        incomeArray.push(expense);
        total += parseFloat(expense.amount);
      });
      setIncome(incomeArray);
      setSum(total);
    } catch (error) {
      Alert.alert('Error fetching expenses')
    }
  };

  const handleCurrency = () => {
    
  }

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
      data={incomes}
      ListEmptyComponent={<EmptyList messages="Your List's Empty :("/>}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <IncomeCard item={item}/>}
      />
    </GestureHandlerRootView>
  )
}

export default IncomeList