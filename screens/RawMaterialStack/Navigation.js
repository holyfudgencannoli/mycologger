import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import CreateNewRawMaterialForm from "./screens/HomeStack/CreateNewRawMaterialForm";


const RawMaterialNav = createMaterialTopTabNavigator()

export default function RawMatertialNavGroup() {
    return(
        <RawMaterialNav.Navigator>
            <RawMaterialNav.Screen component={CreateNewRawMaterialForm} name="New Raw Material" />
            {/* <RawMaterialNav.Screen component={} name="" /> */}
        </RawMaterialNav.Navigator>    
    )
}

