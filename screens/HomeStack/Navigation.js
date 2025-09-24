import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Dashboard from "./Dashboard";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LogoutScreen from "./LogoutScreen";
import PurchaseLogNavGroup from "../PurchaseLogStack/Navigation";
import PurchaseLogRecordsNavGroup from "../PurchaseLogRecordsStack/Navigation";
import TasksNavGroup from "../TasksStack/Navigation";
import SpecimenNavGroup from '../SpecimenStack/Navigation';
import FieldsNavGroup from '../FieldsStack/Navigation';
import ProductsNavGroup from '../ProductsStack/Navigation';
import InventoryNavGroup from '../InventoryStack/Navigation';
import UtilitiesNavGroup from '../UtilitiesStack/Navigation';

const DrawerRouter = createDrawerNavigator()

export default function MainDrawer() {
    return(
        <DrawerRouter.Navigator initialRouteName="Dashboard">
            <DrawerRouter.Screen name="Dashboard" component={Dashboard} />
            <DrawerRouter.Screen component={PurchaseLogNavGroup} name="Purchase Logs"/>
            {/* <DrawerRouter.Screen component={RawMatertialNavGroup} name='Raw Materials'/> */}
            <DrawerRouter.Screen component={TasksNavGroup} name='Tasks'/>
            {/* <DrawerRouter.Screen component={SpecimenNavGroup} name='Specimen'/> */}
            <DrawerRouter.Screen component={FieldsNavGroup} name='Fields'/>
            <DrawerRouter.Screen component={ProductsNavGroup} name='Products'/>
            <DrawerRouter.Screen component={PurchaseLogRecordsNavGroup} name='Purchase Records'/>
            <DrawerRouter.Screen component={InventoryNavGroup} name='Inventory'/>
            <DrawerRouter.Screen component={UtilitiesNavGroup} name='Utilities'/>
            <DrawerRouter.Screen component={LogoutScreen} name='Logout'/>

        </DrawerRouter.Navigator>
    )
}
