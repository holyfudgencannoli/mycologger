import Dashboard from "../HomeDashboradDataPresentation/Dashboard";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import LogoutScreen from "../../screens/HomeStack/LogoutScreen";
// import PurchaseLogNavGroup from "../../screens/PurchaseLogStack/Navigation";
// import PurchaseLogRecordsNavGroup from "../../screens/PurchaseLogRecordsStack/Navigation";
// import TasksNavGroup from "./TaskDocumentationNavigation";
// import SpecimenNavGroup from './SpecimenDocumentationNavigation';
// import FieldsNavGroup from './FieldDocumentationNavigation';
// import ProductsNavGroup from './ProductDocumentationNavigation';
// import InventoryNavGroup from './InventoryDocumentationNavigation';
// import UtilitiesNavGroup from './UtitlitiesDocumentationNavigation';
import RawMatertialNavGroup from './RawMaterialDocumentationNavigation';
// import SterilizationRecordsNavGroup from "./SterilizationDocumentationNavigation";

const DrawerRouter = createDrawerNavigator()

export default function MainDrawer() {
    console.log("Root navigator mounted");

    return(
        <DrawerRouter.Navigator initialRouteName="Dashboard">
            <DrawerRouter.Screen name="Dashboard" component={Dashboard} />
            {/* <DrawerRouter.Screen component={PurchaseLogNavGroup} name="Purchase Logs"/> */}
            <DrawerRouter.Screen component={RawMatertialNavGroup} name='Raw Materials'/>
            {/* <DrawerRouter.Screen component={SpecimenNavGroup} name='Specimen'/>
            <DrawerRouter.Screen component={FieldsNavGroup} name='Fields'/>
            <DrawerRouter.Screen component={ProductsNavGroup} name='Products'/>
            <DrawerRouter.Screen component={TasksNavGroup} name='Tasks'/>
            <DrawerRouter.Screen component={SterilizationRecordsNavGroup} name='Sterilizations'/>
            <DrawerRouter.Screen component={PurchaseLogRecordsNavGroup} name='Purchase Records'/>
            <DrawerRouter.Screen component={InventoryNavGroup} name='Inventory'/>
            <DrawerRouter.Screen component={UtilitiesNavGroup} name='Utilities'/> */}
            {/* <DrawerRouter.Screen component={LogoutScreen} name='Logout'/> */}

        </DrawerRouter.Navigator>
    )
}
