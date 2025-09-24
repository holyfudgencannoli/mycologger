import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Hello from "../ItemInputStack/Hello";
import RawMaterialInventory from './RawMaterialInventory';
import SpecimenInventory from './SpecimenInventory';
import FieldInventory from './FieldInventory';
import ProductInventory from './ProductInventory';

const InventoryNav = createMaterialTopTabNavigator()

export default function InventoryNavGroup() {
    return(
        <InventoryNav.Navigator>
            <InventoryNav.Screen component={RawMaterialInventory} name='Raw Materials'/>
            <InventoryNav.Screen component={SpecimenInventory} name='Specimen'/>
            <InventoryNav.Screen component={FieldInventory} name='Fields'/>
            <InventoryNav.Screen component={ProductInventory} name='Products'/>
        </InventoryNav.Navigator>
    )
}