import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import CreateNewFieldForm from "./CreateNewFieldForm";
import FieldRecords from './FieldRecords';
import CreateNewFieldBatchForm from './CreateNewFieldBatchForm';

const FieldsNav = createMaterialTopTabNavigator()

export default function FieldsNavGroup() {
    return(
        <FieldsNav.Navigator>
            <FieldsNav.Screen component={CreateNewFieldForm} name='New Field'/>
            <FieldsNav.Screen component={CreateNewFieldBatchForm} name='New Field Batch'/>
            <FieldsNav.Screen component={FieldRecords} name='Field Records'/>
        </FieldsNav.Navigator>
    )
}