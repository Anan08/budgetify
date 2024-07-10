import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EmptyList from '../components/EmptyList';
import IncomeCard from '../components/IncomeCard';
import { db } from '../firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';


const IncomeList = () => {

    const navigation = useNavigation();
    const [incomes, setIncomes] = useState([])
    const { folderId } = useLocalSearchParams();
    console.log(folderId);

    const fetchExpenses = async() => {
        try {
            let doc = await getDocs(collection(db, 'incomes', folderId, 'data'));
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
            <View style={{margin:20, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('index');
                }}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>Budgetify </Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => {
                    navigation.navigate('AddIncome', {folderId : folderId})
                }}>
                    <Ionicons name='add-circle-outline' size={25}/>
                </TouchableOpacity>
            </View>
            <FlatList
            data={incomes}
            ListEmptyComponent={<EmptyList messages="Your List's Empty :("/>}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <IncomeCard item={item} folderId={folderId}/>}
            />
        </GestureHandlerRootView>
  )
}

export default IncomeList