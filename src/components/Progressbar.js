import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { CONSTANT, Color } from '../utils';

const Progressbar = ({ top }) => {
    return (
        <View style={{...styles.view_progress, top}}>
            <ActivityIndicator
                size={CONSTANT.HEIGHT * 0.06}
                color={Color.orange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view_progress: {
        position: 'absolute',
        left: 0,
        right: 0,
    }
})

export default Progressbar;