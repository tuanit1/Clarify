import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const DetailScreen = ({navigation}) => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'red'
        }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>Detail screen</Text>
            </TouchableOpacity>

        </View>
    )
}

export default DetailScreen