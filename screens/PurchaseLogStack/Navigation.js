import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import CreateRawMaterialPurchaseLog from "./CreateRawMaterialPurchaseLog"
import CreateSpecimenPurchaseLog from "./CreateSpecimenPurchaseLog"

const PurchaseLogNav = createMaterialTopTabNavigator()

export default function PurchaseLogNavGroup() {
    return(
        <PurchaseLogNav.Navigator>
            <PurchaseLogNav.Screen component={CreateRawMaterialPurchaseLog} name="Create New Raw Material Purchase" />
            <PurchaseLogNav.Screen component={CreateSpecimenPurchaseLog} name="Create New Specimen Purchase" />
        </PurchaseLogNav.Navigator>
    )
}