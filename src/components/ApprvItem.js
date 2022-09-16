import React from 'react';
import { CONSTANT, Color } from '../utils';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const ApprvItem = ({ item }) => {

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <TouchableOpacity style={styles.container}>

            <View style={{
                width: '100%',
                flexDirection: 'row'
            }}>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        color: 'black',
                        fontSize: CONSTANT.HEIGHT * 0.02,
                    }}>{item.alias}</Text>
                </View>

                <TouchableOpacity>
                    <Image
                        style={{
                            height: CONSTANT.HEIGHT * 0.032,
                            width: CONSTANT.HEIGHT * 0.032,
                            tintColor: Color.error_red,
                        }}
                        source={require('../res/delete.png')}
                    />
                </TouchableOpacity>

            </View>

            <View style={{
                width: '100%',
                height: CONSTANT.WIDTH * 0.003,
                backgroundColor: Color.gray,
                marginVertical: CONSTANT.HEIGHT * 0.015
            }} />

            <View style={{
                flexDirection: 'row'
            }}>

                <View style={{
                    flex: 1,
                }}>
                    <Text style={styles.text}>Rang Limite of Approval</Text>
                </View>

                <View style={{
                    flex: 1,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: CONSTANT.HEIGHT * 0.005
                    }}>
                        <View style={{
                            flex: 1.5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                ...styles.text,
                                color: Color.blue
                            }}>Minimum IDR</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end'
                        }}>
                            <Text style={{
                                ...styles.text,
                                color: Color.blue,
                                fontWeight: 'bold'
                            }}>{numberWithCommas(item.range_min)}</Text>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1.5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                ...styles.text,
                                color: Color.blue
                            }}>Minimum IDR</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end'
                        }}>
                            <Text style={{
                                ...styles.text,
                                color: Color.blue,
                                fontWeight: 'bold'
                            }}>{numberWithCommas(item.range_max)}</Text>
                        </View>
                    </View>

                </View>
            </View>

            <View style={{
                width: '100%',
                height: CONSTANT.WIDTH * 0.003,
                backgroundColor: Color.gray,
                marginVertical: CONSTANT.HEIGHT * 0.015
            }} />

            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={styles.text}>Number of Approval</Text>
                </View>

                <View style={{
                    flex: 1,
                    alignItems: 'flex-end'
                }}>

                    <Text style={{
                        ...styles.text,
                        color: Color.blue,
                        fontWeight: 'bold'
                    }}>{item.number}</Text>

                </View>
            </View>

            <View style={{
                width: '100%',
                height: CONSTANT.WIDTH * 0.003,
                backgroundColor: Color.gray,
                marginVertical: CONSTANT.HEIGHT * 0.015
            }} />

            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={styles.text}>Approver</Text>
                </View>

                <View style={{
                    flex: 1,
                    alignItems: 'flex-end'
                }}>

                    <Text style={{
                        ...styles.text,
                        color: Color.blue,
                    }}>{item.approver.map((appver, index) => {
                        return index === item.approver.length - 1 ? appver.name : appver.name + ', '
                    })}</Text>

                </View>
            </View>


        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '85%',
        borderRadius: CONSTANT.HEIGHT * 0.025,
        borderWidth: CONSTANT.WIDTH * 0.003,
        borderColor: Color.gray,
        marginBottom: CONSTANT.HEIGHT * 0.025,
        paddingHorizontal: '5%',
        paddingVertical: '4%'
    },

    text: {
        fontSize: CONSTANT.HEIGHT * 0.016,
        color: 'black'
    }
})

export default ApprvItem