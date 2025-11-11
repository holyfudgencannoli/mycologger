import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import CreateNewFieldForm from "../FieldRecipeRegistration/CreateNewFieldForm";
import FieldRecords from '../FieldManufactureDocumentation/FieldRecords';
import CreateNewFieldBatchForm from '../FieldManufactureDocumentation/CreateNewFieldBatchForm';
import FieldList from '../FieldRecipeRegistration/FieldList';

const FieldsNav = createMaterialTopTabNavigator()

export default function FieldsNavGroup() {
    return(
        <FieldsNav.Navigator>
            <FieldsNav.Screen component={CreateNewFieldForm} name='New Field'/>
            <FieldsNav.Screen component={FieldList} name='Field List'/>
            <FieldsNav.Screen component={CreateNewFieldBatchForm} name='New Field Batch'/>
            <FieldsNav.Screen component={FieldRecords} name='Field Records'/>
        </FieldsNav.Navigator>
    )
}