import { View, Text, Alert, FlatList } from 'react-native'
import React from 'react'
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from '@/components/Header';

const CurrencyCheck = () => {

  const apiUrl = process.env.EXPO_PUBLIC_EXCHANGE_RATE_API;
  const apiKey = process.env.EXPO_PUBLIC_EXCHANGE_RATE_API_KEY;
  const [currencies, setCurrencies] = useState([]);

  const fetchCurrency = async() => {
    try {
     //fetch data and insert into setCurrencies
      const q = await fetch(`${apiUrl}apikey=${apiKey}`);
      const data = await q.json();
      const entries = Object.entries(data.data);
      console.log('fetched data : ', entries);
      setCurrencies(entries);
      console.log(currencies);
    } catch (error) {
      Alert.alert('error fetching data');
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCurrency();
  }, []);

  
  return (
    <GestureHandlerRootView>
      <Header/>
      <FlatList
        data={currencies}
        keyExtractor={([currency]) => currency}
        renderItem={({item}) => (
        <>
        </>
        )}
      />
    </GestureHandlerRootView>
    
  )
}

export default CurrencyCheck