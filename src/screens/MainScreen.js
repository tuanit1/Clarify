import React from 'react';
import { useEffect, useReducer, useRef, useCallback, useState } from 'react';
import {
    View, Text, TouchableOpacity, RefreshControl,
    ScrollView, StyleSheet, StatusBar,
    SafeAreaView, Image, FlatList
} from 'react-native';
import MainReducer from '../reducers/MainReducer';
import { DETAIL_SCREEN } from '../utils/Constant';
import { SET_DATA, SET_REFRESHING, SET_SHOW_PROGRESS, SET_FEATURE } from '../reducers/MainReducer';
import { Color, CONSTANT } from '../utils';
import { createRequest } from '../utils';
import Progressbar from '../components/Progressbar';
import ApprvItem from '../components/ApprvItem';
import BottomSheet from 'reanimated-bottom-sheet';
import FeatureScreen from './FeatureScreen';
import ConfirmModal from '../components/ConfirmModal';
import MessageModal from '../components/MessageModal';

const MainScreen = ({ navigation }) => {

    const initState = {
        approvals: [],
        features: [],
        approvers: [],
        feature_selected: 0,
        refreshing: false,
        showProgress: true
    }

    const [state, dispatch] = useReducer(MainReducer, initState);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalParam, setModalParam] = useState({ title: 'Title', message: 'Descriptions' });
    const [deleteID, setDeleteID] = useState(0);

    const [msgModalVisible, setMsgModalVisible] = useState(false);
    const [msgModalParam, setMsgModalParam] = useState({ title: 'Title', message: 'Descriptions' });
    const bottomSheet = useRef();

    const fetchData = async () => {

        dispatch(SET_SHOW_PROGRESS(true));

        const get_data_url = CONSTANT.SERVER_URL + 'approval/getAll.php';
        const get_feature_url = CONSTANT.SERVER_URL + 'feature/getAll.php';
        const get_approver_url = CONSTANT.SERVER_URL + 'approver/getAll.php';

        const approvals = await createRequest(get_data_url, 'GET', {});
        const features = await createRequest(get_feature_url, 'GET', {})
        const approvers = await createRequest(get_approver_url, 'GET', {});

        features.data.splice(0, 0, { id: "0", name: 'All' });

        dispatch(SET_DATA(approvals.data, features.data, approvers.data))
    }

    const getFeatureName = (id) => {

        const name = state.features.map(feature => {
            if (feature.id == id) {
                return feature.name
            }
        })

        return name ? name : 'Unknown';

    }

    const clickDelete = (id) => {
        setDeleteID(id);
        setModalParam({
            title: 'Confirm to Delete',
            message: 'Are you sure you want to delete this Approval Matrix?'
        });
        setModalVisible(true);
    }

    const handleDelete = async () => {

        const url = CONSTANT.SERVER_URL + 'approval/delete.php';
        const result = await createRequest(url, 'DELETE', {
            id: deleteID
        })

        if (result.status == 1) {

            setMsgModalParam({
                title: 'Success',
                message: 'An Approval Matrix removed'
            })
            setMsgModalVisible(true)

            fetchData();
        } else {
            setMsgModalParam({
                title: 'Failed',
                message: 'Something wrong happened, please try again!'
            });
            setMsgModalVisible(true);

        }
    }

    const openUpdateScreen = (item) => {
        navigation.navigate(DETAIL_SCREEN, {
            type: 'update',
            mItem: item,
            features: state.features,
            approvers: state.approvers,
            fetchData
        })
    }

    const getFilterApproval = () => {
        if (state.feature_selected == 0) {

            return (
                <>
                    {state.approvals.map((item) => {
                        return <ApprvItem
                            key={item.id}
                            item={item}
                            onPress={() => openUpdateScreen(item)}
                            handleDelete={() => clickDelete(item.id)}
                        />
                    })}
                </>
            )

        } else {
            const filter_approvals = state.approvals.filter(item => item.id_feature == state.feature_selected);

            return (
                <>
                    {filter_approvals.map((item) => {
                        return <ApprvItem
                            key={item.id}
                            item={item}
                            onPress={() => openUpdateScreen(item)}
                            handleDelete={() => clickDelete(item.id)}
                        />
                    })}
                </>
            )
        }
    }

    const onFeatureChange = useCallback((id) => {
        bottomSheet.current.snapTo(1)
        dispatch(SET_FEATURE(id));
    }, [])

    useEffect(() => {
        fetchData();
    }, [])


    const onRefresh = () => {
        dispatch(SET_REFRESHING(true));
        fetchData();
    }



    return (

        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                backgroundColor={Color.orange}
            />

            <ConfirmModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                param={modalParam}
                listener={handleDelete}
            />

            <MessageModal
                modalVisible={msgModalVisible}
                setModalVisible={setMsgModalVisible}
                param={msgModalParam}
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
                        <TouchableOpacity
                            onPress={() => navigation.navigate(DETAIL_SCREEN, {
                                type: 'create',
                                features: state.features,
                                approvers: state.approvers,
                                fetchData
                            })}
                            style={styles.btn_add}>
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

                    <TouchableOpacity
                        onPress={() => bottomSheet.current.snapTo(0)}
                        style={styles.view_feature}>

                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{ ...styles.feature_title }}>Feature</Text>
                        </View>
                        <View style={{
                            width: CONSTANT.WIDTH * 0.005,
                            height: '70%',
                            backgroundColor: Color.orange
                        }}>

                        </View>
                        <View style={{
                            flex: 1.6,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}>
                            <Text style={{ ...styles.feature_title, fontWeight: 'bold' }}>{getFeatureName(state.feature_selected)}</Text>
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

                    {getFilterApproval()}
                </View>
            </ScrollView>

            {state.showProgress &&
                <Progressbar top={CONSTANT.HEIGHT * 0.6} />
            }

            <BottomSheet
                ref={bottomSheet}
                initialSnap={1}
                snapPoints={[CONSTANT.HEIGHT, 0]}
                enabledGestureInteraction={false}
                renderContent={() => {
                    return (
                        <FeatureScreen
                            onFeatureChange={onFeatureChange}
                            bottomSheet={bottomSheet}
                            features={state.features}
                            selected={state.feature_selected} />
                    )
                }}
            />
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
        paddingBottom: CONSTANT.HEIGHT * 0.05,
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
        borderRadius: CONSTANT.HEIGHT * 0.03,
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