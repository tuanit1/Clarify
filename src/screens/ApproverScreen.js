import React, { memo, useState } from 'react';
import {
    View, Text, Image, StyleSheet, TouchableOpacity,
    TextInput, ScrollView
} from 'react-native';
import { CONSTANT, Color } from '../utils';
import FeatureItem from '../components/FeatureItem';
import Progressbar from '../components/Progressbar';

const ApproverScreen = ({ mList, selectedList, bottomSheet, onValueChange }) => {

    const [search, setSearch] = useState('');

    const getFilterList = () => {
        const filter_list = mList.filter(feature => feature.name.toLowerCase().includes(search.toLowerCase()));
        return (
            <>
                {filter_list.map((item) => {

                    const filter = selectedList.filter(item1 => item1.id == item.id)
                    const isSelected = filter.length > 0

                    return <FeatureItem
                        onFeatureChange={onValueChange}
                        key={item.id}
                        item={item}
                        selected={isSelected} />
                })}
            </>
        )

    }

    return (
        <View style={styles.container}>
            <View style={styles.main_containter}>
                <View style={styles.header_view}>
                    <Text style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: CONSTANT.HEIGHT * 0.024
                    }}>Select Approvers</Text>

                    <TouchableOpacity
                        onPress={() => bottomSheet.current.snapTo(1)}
                        style={{
                            position: 'absolute',
                            right: 0,
                        }}>
                        <Image
                            style={{
                                height: CONSTANT.HEIGHT * 0.03,
                                width: CONSTANT.HEIGHT * 0.03,
                                tintColor: '#444444',
                            }}
                            source={require('../res/delete.png')}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.search_view}>
                    <Image
                        style={{
                            height: CONSTANT.HEIGHT * 0.03,
                            width: CONSTANT.HEIGHT * 0.03,
                            tintColor: Color.blue,
                            marginRight: CONSTANT.WIDTH * 0.02
                        }}
                        source={require('../res/search.png')}
                    />

                    <TextInput
                        style={styles.text_input}
                        placeholder='Search Keywords'
                        selectionColor="#5C5A59"
                        autoCapitalize='none'
                        
                        onChangeText={text => {
                            setSearch(text)
                        }}
                    />

                </View>

                {mList.length > 0 ?
                    <ScrollView style={styles.scroll}>

                        {getFilterList()}

                        <View style={{
                            width: '100%',
                            height: CONSTANT.HEIGHT * 0.05,
                        }} />


                    </ScrollView>
                    :
                    <Progressbar top={CONSTANT.HEIGHT * 0.4} />
                }


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: CONSTANT.WIDTH,
        height: CONSTANT.HEIGHT,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },

    main_containter: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: CONSTANT.HEIGHT * 0.25,
        borderTopRightRadius: CONSTANT.HEIGHT * 0.04,
        borderTopLeftRadius: CONSTANT.HEIGHT * 0.04
    },

    header_view: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: CONSTANT.HEIGHT * 0.02
    },

    search_view: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: CONSTANT.HEIGHT * 0.025,
        borderColor: Color.gray,
        borderWidth: 1,
        borderRadius: CONSTANT.HEIGHT * 0.01,
        paddingHorizontal: CONSTANT.WIDTH * 0.04
    },

    text_input: {
        flex: 1,
        fontSize: CONSTANT.HEIGHT * 0.022,
        color: 'black'
    },

    scroll: {
        marginTop: CONSTANT.HEIGHT * 0.02,
    }
})

export default memo(ApproverScreen)