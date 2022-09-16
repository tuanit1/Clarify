import React from 'react';
import { useEffect, useReducer } from 'react';
import {
    View, Text, TouchableOpacity, RefreshControl,
    ScrollView, StyleSheet, StatusBar,
    SafeAreaView, Image, FlatList
} from 'react-native';
import MainReducer from '../reducers/MainReducer';
import { SET_DATA, SET_REFRESHING, SET_SHOW_PROGRESS } from '../reducers/MainReducer';
import { Color, CONSTANT } from '../utils';
import { createRequest } from '../utils';
import Progressbar from '../components/Progressbar';
import ApprvItem from '../components/ApprvItem';

const MainScreen = ({ navigation }) => {

    const initState = {
        approvals: [],
        refreshing: false,
        showProgress: true
    }

    const [state, dispatch] = useReducer(MainReducer, initState);

    console.log("re-render main: ", state)

    const fetchData = async () => {

        dispatch(SET_SHOW_PROGRESS(true));

        const get_data_url = CONSTANT.SERVER_URL + 'approval/getAll.php';

        const approvals = await createRequest(get_data_url, 'GET', {});

        dispatch(SET_DATA(approvals.data))
    }

    const onRefresh = () => {
        dispatch(SET_REFRESHING(true));
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                backgroundColor={Color.orange}
            />
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}
                refreshControl={
                    <RefreshControl
                        refreshing={state.refreshing}
                        onRefresh={onRefresh}
                    />
                }>

                <View style={styles.header_container}>
                    <Text style={styles.header_title}>
                        Approval Matrix
                    </Text>
                </View>

                <View style={styles.list_container}>
                    <View style={styles.view_add}>
                        <TouchableOpacity style={styles.btn_add}>
                            <Image
                                style={{
                                    height: CONSTANT.HEIGHT * 0.037,
                                    width: CONSTANT.HEIGHT * 0.037,
                                    tintColor: 'white',
                                    marginRight: '3%'
                                }}
                                source={require('../res/plus.png')}
                            />
                            <Text style={{
                                color: 'white',
                                fontSize: CONSTANT.HEIGHT * 0.018,
                                fontWeight: 'bold'
                            }}>Tambah New Matrix</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.view_feature}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{ ...styles.feature_title, fontWeight: 'bold' }}>Feature</Text>
                        </View>
                        <View style={{
                            width: CONSTANT.WIDTH * 0.005,
                            height: '70%',
                            backgroundColor: Color.orange
                        }}>

                        </View>
                        <View style={{
                            flex: 1.5,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}>
                            <Text style={styles.feature_title}>Default</Text>
                            <Image
                                style={{
                                    height: CONSTANT.HEIGHT * 0.03,
                                    width: CONSTANT.HEIGHT * 0.03,
                                    tintColor: Color.orange,
                                }}
                                source={require('../res/filter.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    {state.approvals.map((item) => {
                        return <ApprvItem key={item.id} item={item} />
                    })}
                </View>
            </ScrollView>

            {state.showProgress &&
                <Progressbar top={CONSTANT.HEIGHT * 0.6} />
            }
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    header_container: {
        width: '100%',
        height: CONSTANT.HEIGHT * 0.15,
        backgroundColor: Color.orange,
        alignItems: 'center',
    },

    header_title: {
        marginTop: CONSTANT.HEIGHT * 0.04,
        color: 'white',
        fontSize: CONSTANT.HEIGHT * 0.028
    },

    list_container: {
        flex: 1,
        marginTop: - CONSTANT.HEIGHT * 0.035,
        borderTopLeftRadius: CONSTANT.HEIGHT * 0.035,
        borderTopRightRadius: CONSTANT.HEIGHT * 0.035,
        backgroundColor: 'white',
        alignItems: 'center'
    },

    view_add: {
        width: '100%',
        alignItems: 'flex-end',
    },

    btn_add: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.blue,
        borderRadius: CONSTANT.HEIGHT * 0.01,
        marginRight: CONSTANT.WIDTH * 0.08,
        marginTop: CONSTANT.HEIGHT * 0.03,
        paddingVertical: '1%',
        paddingHorizontal: '3%'
    },

    view_feature: {
        flexDirection: 'row',
        width: '85%',
        height: CONSTANT.HEIGHT * 0.085,
        marginTop: CONSTANT.HEIGHT * 0.04,
        borderRadius: CONSTANT.HEIGHT * 0.035,
        borderWidth: CONSTANT.WIDTH * 0.003,
        borderColor: Color.orange,
        marginBottom: CONSTANT.HEIGHT * 0.025,
        alignItems: 'center'
    },

    feature_title: {
        color: Color.orange,
        fontSize: CONSTANT.HEIGHT * 0.025,
    },

})

export default MainScreen