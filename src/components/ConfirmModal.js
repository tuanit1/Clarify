import React, { memo } from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { CONSTANT, Color } from "../utils";

const ConfirmModal = ({ modalVisible, setModalVisible, listener, param }) => {

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
                            listener();
                            setModalVisible(!modalVisible);
                        }}>
                        <Text style={{
                            color: 'white',
                            fontSize: CONSTANT.HEIGHT * 0.022,
                            fontWeight: '900'
                        }}>Confirm</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancel}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <Text style={{
                            color: Color.blue,
                            fontSize: CONSTANT.HEIGHT * 0.022,
                            fontWeight: '900'
                        }}>Cancel</Text>
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
        width: CONSTANT.WIDTH * 0.85,
        paddingVertical: CONSTANT.HEIGHT * 0.05,
        paddingHorizontal: CONSTANT.WIDTH * 0.05,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: CONSTANT.HEIGHT * 0.02
    },

    title: {
        fontSize: CONSTANT.HEIGHT * 0.03,
        fontWeight: 'bold',
        color: 'black'
    },

    message: {
        fontSize: CONSTANT.HEIGHT * 0.02,
        fontWeight: '500',
        color: 'black',
        textAlign: 'center',
        marginTop: CONSTANT.HEIGHT * 0.03,
        marginBottom: CONSTANT.HEIGHT * 0.05
    },

    button: {
        backgroundColor: Color.blue,
        width: CONSTANT.WIDTH * 0.55,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: CONSTANT.HEIGHT * 0.01,
        marginBottom: CONSTANT.HEIGHT * 0.01,
        borderRadius: CONSTANT.HEIGHT * 0.01,


    },

    cancel: {
        width: CONSTANT.WIDTH * 0.55,
        paddingVertical: CONSTANT.HEIGHT * 0.01,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: CONSTANT.HEIGHT * 0.01,
        borderWidth: 2,
        borderColor: Color.blue
    }

})

export default memo(ConfirmModal)
