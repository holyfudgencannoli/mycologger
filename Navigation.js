import { NavigationContainer } from "@react-navigation/native";
import AuthStackGroup from "./screens/AuthStack/Navigation";

export default function Navigation() {


    return(
        <NavigationContainer>
            <AuthStackGroup />
        </NavigationContainer>
    )
}