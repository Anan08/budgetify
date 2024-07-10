import { View, Text } from 'react-native'
import React from 'react'

const TotalSum = (sum) => {
    
    if (sum === 0) {
        return
    } else {
        return (
            <View style={{display:'flex', alignItems:'center', margin:30}}>
                <Text style={{fontSize:20, fontWeight:'bold', color:'red'}}>{sum}</Text>
            </View>
        )
    }
    
   
}

export default TotalSum