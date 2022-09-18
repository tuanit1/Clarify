import React, { useState, useCallback, useRef, useMemo } from 'react';
import {
    View, Text, TouchableOpacity, SafeAreaView,
    StyleSheet, StatusBar, ScrollView, Image
} from 'react-native';
import { Color } from '../utils';
import { CONSTANT } from '../utils';
import InputForm from '../components/InputForm';
import BottomSheet from 'reanimated-bottom-sheet';
import FeatureScreen from './FeatureScreen';
import ApproverScreen from './ApproverScreen';
import { createRequest } from '../utils';
import { SERVER_URL } from '../utils/Constant';
import MessageModal from '../components/MessageModal';
import ConfirmModal from '../components/ConfirmModal';

const DetailScreen = ({ navigation, route }) => {

    const { type, mItem, features, approvers, fetchData } = route.params;

    const bottomSheetFeature = useRef();
    const bottomSheetApprover = useRef();
    const [alias, setAlias] = useState(mItem ? mItem.alias : '');
    const [min, setMin] = useState(mItem ? mItem.range_min : '');
    const [max, setMax] = useState(mItem ? mItem.range_max : '');
    const [number, setNumber] = useState(mItem ? mItem.number : '');
    const [mApprovers, setMApprovers] = useState(mItem ? mItem.approver : []);
    const [featureSelect, setFeatureSelect] = useState(mItem ? mItem.id_feature : -1);

    const [msgModalVisible, setMsgModalVisible] = useState(false);
    const [msgModalParam, setMsgModalParam] = useState({ title: 'Title', message: 'Descriptions' });

    const [modalVisible, setModalVisible] = useState(false);
    const [modalParam, setModalParam] = useState({ title: 'Title', message: 'Descriptions' });
    const [modalListener, setModalListener] = useState(() => () => { })

    const getFeatureText = useCallback(() => {

        if (featureSelect != -1) {
            const feature = features.filter((feature) => feature.id === featureSelect)
            return feature[0].name
        } else {
            return ''
        }
    }, [featureSelect])

    const getApproverText = useCallback(() => {

        if (mApprovers.length > 0) {

            let msg = ''
            mApprovers.map((item, index) => {

                if (index + 1 < mApprovers.length) {
                    msg += item.name + ', '
                } else {
                    msg += item.name
                }

            })

            return msg
        } else {
            return ''
        }
    }, [mApprovers])

    const handleReset = () => {

        setAlias('')
        setMin('')
        setMax('')
        setNumber('')
        setMApprovers([])
        setFeatureSelect(-1)

    }

    const isNumeric = (str) => {
        if (typeof str != "string") return false
        return !isNaN(str) &&
            !isNaN(parseFloat(str))
    }

    const verifyForm = () => {

        let msg = '';
        let isError = false;

        if (alias === '') {
            msg += "\n• Alias missing"
            isError = true;
        }

        if (featureSelect == -1) {
            msg += "\n• Feature missing"
            isError = true;
        }

        if (min === 0) {
            msg += "\n• Minimum of Approval missing"
            isError = true;
        } else if (!isNumeric(min.trim())) {
            msg += "\n• Minimum of Approval must be numeric"
            isError = true;
        }

        if (max === 0) {
            msg += "\n• Maximum of Approval missing"
            isError = true;
        }
        else if (!isNumeric(max.trim())) {
            msg += "\n• Maximum of Approval must be numeric"
            isError = true;
        }

        if (isNumeric(min.trim()) && isNumeric(max.trim() && min > max)) {
            msg += "\n• Minimum of Approval can not greater than Maximum of Approval"
            isError = true;
        }

        if (number === 0) {
            msg += "\n• Number of Approval missing"
            isError = true;
        } else if (!isNumeric(number)) {
            msg += "\n• Number of Approval must be numeric"
            isError = true;
        }

        if (isError) {

            setMsgModalParam({
                title: 'Failed',
                message: msg.trim()
            })
            setMsgModalVisible(true)

            return false
        } else {

            return true
        }

    }


    const handleCreate = async () => {

        if (!verifyForm()) {
            return;
        }

        setModalParam({
            title: 'Comfirm to Add',
            message: 'Please confirm to create new Approval Matrix'
        })

        setModalListener(() => async () => {
            const url = SERVER_URL + 'approval/create.php';
            const result = await createRequest(url, 'POST', {
                alias: alias,
                id_feature: featureSelect,
                range_min: min,
                range_max: max,
                number: number,
                approvers: mApprovers
            })

            if (result.status == 1) {

                setMsgModalParam({
                    title: 'Success',
                    message: 'New Approval Matrix added'
                })
                setMsgModalVisible(true)

                handleReset();
                fetchData();
            } else {
                setMsgModalParam({
                    title: 'Failed',
                    message: 'Something wrong happened! Please try again!'
                })
                setMsgModalVisible(true)
            }
        })

        setModalVisible(true);


    }

    const handleUpdate = async () => {

        if (!verifyForm()) {
            return;
        }

        setModalParam({
            title: 'Comfirm to Update',
            message: 'Please confirm to update this Approval Matrix'
        })

        setModalListener(() => async () => {
            const url = SERVER_URL + 'approval/update.php';
            const result = await createRequest(url, 'PUT', {
                id: mItem.id,
                alias: alias,
                id_feature: featureSelect,
                range_min: min,
                range_max: max,
                number: number,
                approvers: mApprovers
            })

            if (result.status == 1) {

                setMsgModalParam({
                    title: 'Success',
                    message: 'New Approval Matrix updated'
                })
                setMsgModalVisible(true)

                handleReset();
                fetchData();
            } else {
                setMsgModalParam({
                    title: 'Failed',
                    message: 'Something wrong happened! Please try again!'
                })
                setMsgModalVisible(true)
            }
        })

        setModalVisible(true);

    }

    const onChangeAlias = useCallback((text) => {
        setAlias(text)
    }, [])

    const onChangeMin = useCallback((text) => {
        setMin(text)
    }, [])

    const onChangeMax = useCallback((text) => {
        setMax(text)
    }, [])

    const onChangeNumber = useCallback((text) => {
        setNumber(text)
    }, [])

    const openFeatureChoice = useCallback(() => {
        bottomSheetFeature.current.snapTo(0);
    }, [])

    const openApproverChoice = useCallback(() => {
        bottomSheetApprover.current.snapTo(0);
    }, [])

    const onFeatureChange = useCallback((id) => {
        setFeatureSelect(id);
        bottomSheetFeature.current.snapTo(1)
    }, [])

    const onApproverChange = useCallback((id) => {

        const filter = mApprovers.filter(approver => approver.id == id)

        if (filter.length > 0) {
            const index = mApprovers.indexOf(filter[0]);

            if (index > -1) {
                mApprovers.splice(index, 1);
            }
        } else {

            const filter = approvers.filter(approver => approver.id == id)

            mApprovers.push(filter[0])

        }

        const list = [...mApprovers]

        setMApprovers(list);

    }, [])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                backgroundColor={Color.orange}
            />

            <ConfirmModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                param={modalParam}
                listener={modalListener}
            />

            <MessageModal
                modalVisible={msgModalVisible}
                setModalVisible={setMsgModalVisible}
                param={msgModalParam}
            />

            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.header_container}>
                    <View style={{
                        top: CONSTANT.HEIGHT * 0.04,
                        width: '100%',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                position: 'absolute',
                                left: CONSTANT.WIDTH * 0.06
                            }}>
                            <Image
                                style={{
                                    height: CONSTANT.HEIGHT * 0.04,
                                    width: CONSTANT.HEIGHT * 0.04,
                                    tintColor: 'white',
                                }}
                                source={require('../res/ic_back.png')}
                            />
                        </TouchableOpacity>
                        <Text style={styles.header_title}>
                            Approval Matrix
                        </Text>
                    </View>

                </View>

                <View style={styles.list_container}>
                    <Text style={{
                        fontSize: CONSTANT.WIDTH * 0.06,
                        fontWeight: '900',
                        color: Color.orange,
                        marginVertical: CONSTANT.HEIGHT * 0.022,
                    }}>
                        {type === 'create' ? 'Create New Approval Matrix' : 'Update Approval Matrix'}
                    </Text>

                    <View
                        style={{
                            width: '85%',
                            height: 2,
                            marginBottom: CONSTANT.HEIGHT * 0.025,
                            backgroundColor: Color.gray
                        }}
                    />

                    <InputForm
                        title={'Approval Matrix Alias'}
                        value={alias}
                        onChangeText={onChangeAlias}
                        keyboardType="default"
                        IDR={false}
                    />

                    <InputForm
                        title={'Feature'}
                        value={getFeatureText()}
                        keyboardType="default"
                        IDR={false}
                        isChoice={true}
                        onPress={openFeatureChoice}
                    />

                    <InputForm
                        title={'Range of Approval (Mininum)'}
                        value={min}
                        onChangeText={onChangeMin}
                        keyboardType="numeric"
                        IDR={true}
                    />

                    <InputForm
                        title={'Range of Approval (Maximum)'}
                        value={max}
                        onChangeText={onChangeMax}
                        keyboardType="numeric"
                        IDR={true}
                    />

                    <InputForm
                        title={'Number of Approval'}
                        value={number}
                        onChangeText={onChangeNumber}
                        keyboardType="numeric"
                        IDR={false}
                    />

                    <InputForm
                        title={'Approver'}
                        value={getApproverText()}
                        keyboardType="default"
                        IDR={false}
                        isChoice={true}
                        onPress={openApproverChoice}
                    />

                    <TouchableOpacity
                        onPress={() => {
                            if (type === 'create') {
                                handleCreate();
                            } else {
                                handleUpdate();
                            }
                        }}
                        style={styles.btn_submit}>
                        <Text style={{
                            fontSize: CONSTANT.WIDTH * 0.045,
                            color: 'white',
                            fontWeight: '900'
                        }}>{type === 'create' ? 'ADD TO :LIST' : 'UPDATE TO :LIST'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleReset}
                        style={styles.btn_reset}>
                        <Text style={{
                            fontSize: CONSTANT.WIDTH * 0.045,
                            color: Color.blue,
                            fontWeight: '900'
                        }}>RESET</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

            <BottomSheet
                ref={bottomSheetFeature}
                initialSnap={1}
                snapPoints={[CONSTANT.HEIGHT, 0]}
                enabledGestureInteraction={false}
                renderContent={() => {
                    return (
                        <FeatureScreen
                            onFeatureChange={onFeatureChange}
                            bottomSheet={bottomSheetFeature}
                            features={features.filter(feature => feature.id != 0)}
                            selected={featureSelect} />
                    )
                }}
            />

            <BottomSheet
                ref={bottomSheetApprover}
                initialSnap={1}
                snapPoints={[CONSTANT.HEIGHT, 0]}
                enabledGestureInteraction={false}
                renderContent={() => {
                    return (
                        <ApproverScreen
                            onValueChange={onApproverChange}
                            bottomSheet={bottomSheetApprover}
                            mList={approvers}
                            selectedList={mApprovers} />
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
        justifyContent: 'center',
        flexDirection: 'row'
    },

    header_title: {
        color: 'white',
        fontSize: CONSTANT.HEIGHT * 0.028
    },

    list_container: {
        flex: 1,
        marginTop: - CONSTANT.HEIGHT * 0.035,
        borderTopLeftRadius: CONSTANT.HEIGHT * 0.035,
        borderTopRightRadius: CONSTANT.HEIGHT * 0.035,
        paddingBottom: CONSTANT.HEIGHT * 0.09,
        backgroundColor: 'white',
        alignItems: 'center'
    },

    btn_submit: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: CONSTANT.HEIGHT * 0.06,
        height: CONSTANT.HEIGHT * 0.08,
        width: '85%',
        borderRadius: CONSTANT.HEIGHT * 0.02,
        backgroundColor: Color.blue,
    },

    btn_reset: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: CONSTANT.HEIGHT * 0.015,
        height: CONSTANT.HEIGHT * 0.08,
        width: '85%',
        borderRadius: CONSTANT.HEIGHT * 0.02,
        borderWidth: 1,
        borderColor: Color.blue
    }
})

export default DetailScreen