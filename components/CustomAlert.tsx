import { View, Text, Modal, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomAlert = (transparent:boolean, visible:any, onClose:any, imageSource:any, message:any ) => {
  return (
    <Modal
    transparent={true}
    animationType='fade'
    visible={visible}
    onRequestClose={onClose}>
        <View>
            <View>
                <Image source={imageSource}/>
            </View>
            <Text>{message}</Text>
            <TouchableOpacity
            onPress={onClose}>
                <Text>OK</Text>
            </TouchableOpacity>
        </View>

    </Modal>
  )
}

export default CustomAlert