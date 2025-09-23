import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import CreateNewSpecimenForm from "./screens/HomeStack/CreateNewSpecimenForm";
import SpecimenPurchaseLogRecords from "./screens/PurchaseLogRecordsStack/SpecimenPurchaseLogRecords";

const SpecimenNav = createMaterialTopTabNavigator()

export default function SpecimenNavGroup() {
    return(
        <SpecimenNav.Navigator>
            <SpecimenNav.Screen component={CreateNewSpecimenForm} name='New Specimen'/>
        </SpecimenNav.Navigator>
    )
}
