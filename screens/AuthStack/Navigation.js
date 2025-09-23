import Login from "./screens/AuthStack/Login";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from "./screens/AuthStack/Register";
import PasswordRecoveryScreen from "./screens/AuthStack/PasswordRecovery";

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