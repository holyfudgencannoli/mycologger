import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import WaterUsage from "./WaterUsage";

const UtilitiesNav = createMaterialTopTabNavigator()

export default function UtilitiesNavGroup() {
    <UtilitiesNav.Navigator>
        <UtilitiesNav.Screen component={WaterUsage} name="Water Usage"/>
    </UtilitiesNav.Navigator>
}