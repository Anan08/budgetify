import { View, Text, Alert, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Header from '../components/Header'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { db } from '../firebaseConfig'
import { getDocs, where, collection, doc } from 'firebase/firestore'
import EmptyList from '../components/EmptyList'
import ExpenseCard from '../components/ExpenseCard'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'

const ExpenseList = () => {

    const navigation = useNavigation();
    
    const [expenses, setExpenses] = useState([])
    const {folderId} = useLocalSearchParams();
    console.log(folderId);

    const fetchExpenses = async() => {
        try {
            let doc = await getDocs(collection(db, 'expenses', folderId, 'data'));
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
        <View style={{margin:20, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('index');
          }}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>Budgetify </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddExpense', {folderId : folderId})
          }}>
            <Ionicons name='add-circle-outline' size={25}/>
          </TouchableOpacity>
        </View>
        <FlatList
        data={expenses}
        ListEmptyComponent={<EmptyList messages="Your List's Empty :("/>}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <ExpenseCard item={item} folderId={folderId}/>}
        />
    </GestureHandlerRootView>
  )
}

export default ExpenseList