import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react';

const CustomRadioButton = ({ label, selected, onSelect }) => ( 
  <TouchableOpacity 
      style={[styles.radioButton, 
      { backgroundColor: selected ? '#007BFF' : '#FFF' }]} 
      onPress={onSelect} 
  > 
      <Text style={[styles.radioButtonText, 
      { color: selected ? '#FFF' : '#000' }]}> 
          {label} 
      </Text> 
  </TouchableOpacity> 
); 


const styles = StyleSheet.create({ 
  container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#F5F5F5', 
  }, 
  radioButton: { 
      paddingVertical: 12, 
      paddingHorizontal: 16, 
      borderRadius: 50, 
      marginVertical: 8, 
      borderWidth: 0.1, 
      borderColor: '#007BFF', 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      width: 300
      , 
  }, 
  radioButtonText: { 
      fontSize: 15, 
  }, 
}); 
export default CustomRadioButton