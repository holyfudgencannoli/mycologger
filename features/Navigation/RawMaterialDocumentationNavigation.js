import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import RawMaterialList from '../RawMaterials/RawMaterialListScreen';
import NewRMFormScreen from '../RawMaterials/NewRMFormScreen';
import CreateRawMaterialPurchase from '../../components/forms/CreateRawMaterialPurchase';


const RawMaterialNav = createMaterialTopTabNavigator()

export default function RawMatertialNavGroup() {
    return(
        <RawMaterialNav.Navigator>
            <RawMaterialNav.Screen component={NewRMFormScreen} name="New Raw Material" />
            <RawMaterialNav.Screen component={RawMaterialList} name="Raw Material List" />
            <RawMaterialNav.Screen component={CreateRawMaterialPurchase} name="New Purchase Log" />
        </RawMaterialNav.Navigator>    
    )
}

