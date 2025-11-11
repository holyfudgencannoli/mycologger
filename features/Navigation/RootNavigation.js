import { NavigationContainer } from "@react-navigation/native";
import AuthStackGroup from "./AuthenticationNavigation";

export default function Navigation() {
    return(
        <NavigationContainer>
            <AuthStackGroup />
        </NavigationContainer>
    )
}