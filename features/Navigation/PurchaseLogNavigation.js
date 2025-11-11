import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import RawMaterialPurchaseLogRecords from "./RawMaterialPurchaseLogRecords"
import SpecimenPurchaseLogRecords from "./SpecimenPurchaseLogRecords"

const PurchaseLogRecordsNav = createMaterialTopTabNavigator()

export default function PurchaseLogRecordsNavGroup() {
    return(
        <PurchaseLogRecordsNav.Navigator>
            <PurchaseLogRecordsNav.Screen component={RawMaterialPurchaseLogRecords} name="Raw Material Purchase Logs" />
            <PurchaseLogRecordsNav.Screen component={SpecimenPurchaseLogRecords} name="Specimen Purchase Logs" />
        </PurchaseLogRecordsNav.Navigator>
    )
}
