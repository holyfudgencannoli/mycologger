import Login from "./screens/AuthStack/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from "./screens/AuthStack/Register";
import PasswordRecoveryScreen from "./screens/AuthStack/PasswordRecovery";
import Dashboard from "./screens/HomeStack/Dashboard";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import CreateTaskForm from "./screens/TasksStack/CreateTaskForm";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CreateNewSpecimenForm from "./screens/HomeStack/CreateNewSpecimenForm";
import CreateNewFieldForm from "./screens/HomeStack/CreateNewFieldForm";
import CreateNewRawMaterialForm from "./screens/HomeStack/CreateNewRawMaterialForm";
import CreateNewProductForm from "./screens/HomeStack/CreateNewProductForm";
import CreateNewProductBatchForm from "./screens/HomeStack/CreateNewProductBatchForm";
import UploadRecipt from "./screens/HomeStack/UploadRecipt";
import LogoutScreen from "./screens/HomeStack/LogoutScreen";
import CreateRawMaterialPurchaseLog from "./screens/PurchaseLogStack/CreateRawMaterialPurchaseLog";
import CreateSpecimenPurchaseLog from "./screens/PurchaseLogStack/CreateSpecimenPurchaseLog";
import RawMaterialPurchaseLogRecords from "./screens/PurchaseLogRecordsStack/RawMaterialPurchaseLogRecords";
import SpecimenPurchaseLogRecords from "./screens/PurchaseLogRecordsStack/SpecimenPurchaseLogRecords";
import Hello from "./screens/ItemInputStack/Hello";


export default function Navigation() {


    return(
        <NavigationContainer>
            <AuthStackGroup />
        </NavigationContainer>
    )
}