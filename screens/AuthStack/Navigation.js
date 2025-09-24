import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Login from "./Login";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from "./Register";
import PasswordRecoveryScreen from "./PasswordRecovery";
import MainDrawer from "../HomeStack/Navigation";

const AuthStack = createNativeStackNavigator();

export default function AuthStackGroup() {
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen component={Login} name='Login' options={{ headerShown: false }}/>
            <AuthStack.Screen component={RegisterScreen} name='RegisterScreen' options={{ headerShown: false }}/>
            <AuthStack.Screen component={PasswordRecoveryScreen} name='PasswordRecoveryScreen' />
            <AuthStack.Screen component={MainDrawer} name='Root' options={{ headerShown: false }} />
        </AuthStack.Navigator>
    )
    
}