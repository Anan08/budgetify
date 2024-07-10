import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react';

const CustomRadioButton = ({data, onSelect}) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleSelected = (value) => {
        if (selectedValue !== value) {
            setSelectedValue(value);
            onSelect(value);
        }
    }
    return (
        <View>
          {data.map((item) => {
            return (
            <TouchableOpacity
            key={item.value}
            onPress={handleSelected(item.value)}>
                <Text>{item.value}</Text>
            </TouchableOpacity>
            )
          })}
        </View>
      )
}

export default CustomRadioButton