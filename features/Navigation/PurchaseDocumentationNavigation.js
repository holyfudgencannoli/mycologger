import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import CreateRawMaterialPurchaseLog from "../RawMaterials/NewRMPurchaseLogScreen"
import CreateSpecimenPurchaseLog from "../PurchaseRecordDocumentation/CreateSpecimenPurchaseLog"
import CreateRawMaterial from '../RawMaterials/NewRMFormScreen'

const PurchaseLogNav = createMaterialTopTabNavigator()

export default function PurchaseLogNavGroup() {
    return(
        <PurchaseLogNav.Navigator>
            <PurchaseLogNav.Screen component={CreateRawMaterial} name="Create New Raw Material" />
            <PurchaseLogNav.Screen component={CreateRawMaterialPurchaseLog} name="Create New Raw Material Purchase" />
            <PurchaseLogNav.Screen component={CreateSpecimenPurchaseLog} name="Create New Specimen Purchase" />
        </PurchaseLogNav.Navigator>
    )
}