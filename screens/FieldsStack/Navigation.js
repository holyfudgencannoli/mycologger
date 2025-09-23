import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import CreateNewFieldForm from "./screens/HomeStack/CreateNewFieldForm";

const FieldsNav = createMaterialTopTabNavigator()

export default function FieldsNavGroup() {
    return(
        <FieldsNav.Navigator>
            <FieldsNav.Screen component={CreateNewFieldForm} name='New Field'/>
        </FieldsNav.Navigator>
    )
}