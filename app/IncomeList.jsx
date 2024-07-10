import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from '../components/Header'
import EmptyList from '../components/EmptyList'
import IncomeCard from '../components/IncomeCard'
import { db } from '../firebaseConfig'
import { getDocs, where, collection } from 'firebase/firestore';


const IncomeList = () => {

    const [incomes, setIncomes] = useState([])
    const { folderId } = useLocalSearchParams();

    const fetchExpenses = async() => {
        try {
            let doc = await getDocs(collection(db, 'incomes'), where('folderId','==', folderId));
            const incomesArray = [];
            doc.forEach((doc) => {
                const data = doc.data();
                const income = {id: doc.id, ...data};
                incomesArray.push(income);
            });
            console.log(incomesArray);
            setIncomes(incomesArray);
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
            data={incomes}
            ListEmptyComponent={<EmptyList messages="Your List's Empty :("/>}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <IncomeCard item={item}/>}
            />
        </GestureHandlerRootView>
  )
}

export default IncomeList