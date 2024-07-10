import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { incomesRef } from "../firebaseConfig";
import EmptyList from '@/components/EmptyList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getDocs, query, where } from 'firebase/firestore';
import IncomeFolderCard from '../components/IncomeFolderCard'
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const IncomeCardList = () => {
  const navigation = useNavigation();
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
    } catch (error) {
      Alert.alert('Error fetching expenses')
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
        data={incomes}
        numColumns={2}
        ListEmptyComponent={<EmptyList messages="Your List's Empty :("/>}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <IncomeFolderCard item={item}/>}
        />
      </View>
    </GestureHandlerRootView>
  )
}

export default IncomeCardList