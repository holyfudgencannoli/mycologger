import Login from "../Authentication/Login";
import MainDrawer from "./HomeNavigation";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AuthStack = createNativeStackNavigator();

export default function AuthStackGroup() {
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen component={Login} name='Login' options={{ headerShown: false }}/>
            <AuthStack.Screen component={MainDrawer} name='Root' options={{ headerShown: false }} />
        </AuthStack.Navigator>
    )
    
}