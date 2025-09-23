import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Hello from "./screens/ItemInputStack/Hello";

const InventoryNav = createMaterialTopTabNavigator()

export default function InventoryNavGroup() {
    return(
        <InventoryNav.Navigator>
            <InventoryNav.Screen component={Hello} name='Raw Materials'/>
            <InventoryNav.Screen component={Hello} name='Specimen'/>
            <InventoryNav.Screen component={Hello} name='Fields'/>
            <InventoryNav.Screen component={Hello} name='Products'/>
        </InventoryNav.Navigator>
    )
}