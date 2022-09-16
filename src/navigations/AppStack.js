import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CONSTANT } from '../utils'
import MainScreen from '../screens/MainScreen'
import DetailScreen from '../screens/DetailScreen'

const Stack = createNativeStackNavigator()

const AppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={CONSTANT.MAIN_SCREEN}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={CONSTANT.MAIN_SCREEN} component={MainScreen} />
            <Stack.Screen name={CONSTANT.DETAIL_SCREEN} component={DetailScreen} />
        </Stack.Navigator>
    )
}

export default AppStack