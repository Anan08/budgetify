import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { expensesRef } from "../firebaseConfig";
import EmptyList from '@/components/EmptyList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ExpenseFolderCard from '@/components/ExpenseFolderCard';
import { getDocs } from 'firebase/firestore';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


const ExpenseCardList = () => {

  const navigation = useNavigation();
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
    } catch (error) {
      Alert.alert('Error fetching expenses')
      console.log(error)
    }
  };


  useEffect(() => {
    fetchExpenses();
  }, [])



  return (
    <GestureHandlerRootView>
      <View style={{margin:20, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('index');
          }}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>Budgetify </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddFolder');
          }}>
            <Ionicons name='add-circle-outline' size={25}/>
          </TouchableOpacity>
      </View>
      {/* <View style={{display:'flex', alignItems:'center', padding:10, backgroundColor:'#E7E7E7', margin:20, borderRadius:30}}>
        <Text style={{fontSize:15, fontWeight:'600', margin:20}}>Your total Outcome</Text>
        <Text style={{fontSize:15, fontWeight:'600', margin:5}}>Rp.{sum}</Text>
      </View> */}

      <View>
        <FlatList
        data={expenses}
        numColumns={2}
        ListEmptyComponent={<EmptyList messages="Your List's Empty :("/>}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ExpenseFolderCard item={item}/>}
        />
      </View>
    </GestureHandlerRootView>
  )
}

export default ExpenseCardList