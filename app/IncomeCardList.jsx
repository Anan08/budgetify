import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db, incomesRef } from "../firebaseConfig";
import EmptyList from '@/components/EmptyList';
import Header from '@/components/Header';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { collection, getDocs, query, where } from 'firebase/firestore';
import IncomeFolderCard from '../components/IncomeFolderCard'
import { useRouter } from 'expo-router';

const IncomeCardList = () => {
  const [sum, setSum] = useState(0);
  const router = useRouter()
  const [incomes, setIncome] = useState([]);

  const fetchExpenses = async () => {
    try {
      const querySnapshot = await getDocs(incomesRef);
      const incomeArray = [];
      let total = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const expense = {id: doc.id, ...data};
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
      renderItem={({item}) => <IncomeFolderCard item={item}/>}
      />
    </GestureHandlerRootView>
  )
}

export default IncomeCardList