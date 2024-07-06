import React from "react";
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity,  } from "react-native";
import { useState, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Main() {
    const [click, setClick] = useState(0)
    return (
        <GestureHandlerRootView>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    <TouchableOpacity>
                        <Text>Add Expense</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text>Add Income</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text>Currency Check</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </GestureHandlerRootView>
        
    )
}


const styles = StyleSheet.create({
    scrollContainer:{
        backgroundColor:'white',
    },
    container:{
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        marginTop:50
    },
    button:{
        marginTop:50,
        backgroundColor:'black',
        borderRadius: 50,
        padding: 20
    },
    textButton:{
        color:'white'
    }
})