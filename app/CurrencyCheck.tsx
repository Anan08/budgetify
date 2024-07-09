import { View, Text } from 'react-native'
import React from 'react'
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from '@/components/Header';

const CurrencyCheck = () => {
  
  return (
    <GestureHandlerRootView>
      <Header/>
    </GestureHandlerRootView>
    
  )
}

export default CurrencyCheck