import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {} from '@react-navigation/stack';

const AppStack = createStackNavigator(); //primeira navegação criada

import Incidents from './pages/incidents';
import Detail from './pages/Detail';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen component={Incidents}/>
                <AppStack.Screen component={Detail}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}