import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CreateWaterUsageLog from "../UtilitiesDocumentation/WaterUsage";

const UtilitiesNav = createMaterialTopTabNavigator()

export default function UtilitiesNavGroup() {
    return(
        <UtilitiesNav.Navigator>
            <UtilitiesNav.Screen component={CreateWaterUsageLog} name="Water Usage"/>
        </UtilitiesNav.Navigator>
    )
}