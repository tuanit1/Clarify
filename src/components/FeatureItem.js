import React, { memo } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CONSTANT, Color } from '../utils';

const FeatureItem = ({ item, selected, onFeatureChange }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onFeatureChange(item.id)}>
            <Text style={styles.text}>{item.name}</Text>
            <Image
                style={{
                    height: CONSTANT.HEIGHT * 0.032,
                    width: CONSTANT.HEIGHT * 0.032,
                    tintColor: Color.blue,
                    marginRight: CONSTANT.WIDTH * 0.02
                }}
                source={ selected ? require('../res/check.png') : require('../res/unchecked.png')}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: CONSTANT.WIDTH * 0.85,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: CONSTANT.HEIGHT * 0.015,
    },

    text: {
        color: 'black',
        fontSize: CONSTANT.HEIGHT * 0.022,
    }
})

export default memo(FeatureItem)