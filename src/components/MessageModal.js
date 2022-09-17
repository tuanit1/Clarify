import React, { memo } from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { CONSTANT, Color } from "../utils";

const MessageModal = ({ modalVisible, setModalVisible, param }) => {

    console.log("re-render modal")

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.container}>
                <View style={styles.modal}>

                    <Text style={styles.title}>{param.title}</Text>
                    <Text style={styles.message}>{param.message}</Text>

                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <Text style={{
                            color: 'white',
                            fontSize: CONSTANT.HEIGHT * 0.02,
                        }}>Okay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modal: {
        width: CONSTANT.WIDTH * 0.7,
        paddingVertical: CONSTANT.HEIGHT * 0.02,
        paddingHorizontal: CONSTANT.WIDTH * 0.06,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: CONSTANT.HEIGHT * 0.02
    },

    button: {
        height: CONSTANT.HEIGHT * 0.08,
        width: CONSTANT.WIDTH * 0.4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontSize: CONSTANT.HEIGHT * 0.028,
        fontWeight: 'bold',
        color: '#282828'
    },

    message: {
        fontSize: CONSTANT.HEIGHT * 0.02,
        color: 'black',
        textAlign: 'center',
        marginTop: CONSTANT.HEIGHT * 0.01,
        marginBottom: CONSTANT.HEIGHT * 0.03
    },

    button: {
        backgroundColor: Color.blue,
        height: CONSTANT.HEIGHT * 0.047,
        width: CONSTANT.WIDTH * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: CONSTANT.HEIGHT * 0.04
    }

})

export default memo(MessageModal)
