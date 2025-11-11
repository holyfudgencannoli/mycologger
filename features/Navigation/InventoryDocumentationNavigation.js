import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import RawMaterialInventory from '../RawMaterialInventoryDocumentation/RawMaterialInventory';
import SpecimenInventory from '../SpecimenInventoryDocumentation/SpecimenInventory';
import FieldInventory from '../FieldInventoryDocumentation/FieldInventory';
import ProductInventory from '../ProductInventoryDocumentation/ProductInventory';

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