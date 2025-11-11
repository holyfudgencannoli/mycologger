import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import SpecimenPurchaseLogRecords from "../PurchaseRecordDocumentation/SpecimenPurchaseLogRecords";
import CreateSpecimenPurchaseLog from '../PurchaseRecordDocumentation/CreateSpecimenPurchaseLog';
import CreateSpecimen from '../SpecimenInventoryDocumentation/CreateSpecimen';
import SpecimenList from '../SpecimenInventoryDocumentation/SpecimenList';

const SpecimenNav = createMaterialTopTabNavigator()

export default function SpecimenNavGroup() {
    return(
        <SpecimenNav.Navigator>
            <SpecimenNav.Screen component={CreateSpecimen} name='New Specimen'/>
            <SpecimenNav.Screen component={SpecimenList} name='Specimen List'/>
            <SpecimenNav.Screen component={CreateSpecimenPurchaseLog} name='New Purchase Log'/>
            <SpecimenNav.Screen component={SpecimenPurchaseLogRecords} name='Purchase Records'/>
        </SpecimenNav.Navigator>
    )
}
