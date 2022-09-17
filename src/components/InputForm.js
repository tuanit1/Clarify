import React, { memo, useState } from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { CONSTANT, Color } from '../utils';

const InputForm = ({ title, value, onPress,
    onChangeText, keyboardType, IDR, isChoice, ...rest }) => {

    const [isFirst, setIsFirst] = useState(true);

    const isNumeric = (str) => {
        if (typeof str != "string") return false
        return !isNaN(str) &&
            !isNaN(parseFloat(str))
    }

    const getErrorMessage = () => {

        if (value === '' && !isFirst) {
            return (
                <Text Text style={styles.error}>Empty Field!</Text>
            )
        } else if (keyboardType === 'numeric' && !isNumeric(value) && !isFirst) {
            return (
                <Text Text style={styles.error}>Must be numeric!</Text>
            )
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.input_view}>

                {IDR &&
                    <Text style={{ ...styles.title, marginRight: CONSTANT.WIDTH * 0.05 }}>IDR</Text>
                }

                <TextInput
                    value={value}
                    editable={!isChoice}
                    style={styles.input}
                    selectionColor="#5C5A59"
                    autoCapitalize='none'
                    keyboardType={keyboardType}
                    onChangeText={(text) => {
                        setIsFirst(false);
                        onChangeText(text);
                    }}
                />

                {isChoice &&

                    <TouchableOpacity onPress={() => {
                        setIsFirst(false);
                        onPress();
                    }}>
                        <Image
                            style={{
                                height: CONSTANT.HEIGHT * 0.04,
                                width: CONSTANT.HEIGHT * 0.04,
                                tintColor: '#919192',
                            }}
                            source={require('../res/arrow_down.png')}
                        />
                    </TouchableOpacity>


                }


            </View>

            {getErrorMessage()}
        </View>

        
    )
}

const styles = StyleSheet.create({
    container: {
        width: '85%',
        marginTop: CONSTANT.HEIGHT * 0.03
    },

    title: {
        fontSize: CONSTANT.HEIGHT * 0.023,
        color: 'black',
    },

    input: {
        flex: 1,
        fontSize: CONSTANT.HEIGHT * 0.023,
        color: 'black',
    },

    error: {
        fontSize: CONSTANT.HEIGHT * 0.02,
        color: Color.error_red,
    },

    input_view: {
        paddingHorizontal: CONSTANT.WIDTH * 0.05,
        paddingVertical: CONSTANT.HEIGHT * 0.003,
        borderRadius: CONSTANT.HEIGHT * 0.02,
        marginVertical: CONSTANT.HEIGHT * 0.01,
        borderWidth: 2,
        borderColor: Color.gray,
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default memo(InputForm)