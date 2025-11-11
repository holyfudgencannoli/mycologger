import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CreatNewSterilizationRecord from "../SterilizationDocumentaton/SterilizationDocumentationForm";
import SterilizationRecords from "../SterilizationDocumentaton/SterilizationRecords";



const SterilizationRecordsNav = createMaterialTopTabNavigator()

export default function SterilizationRecordsNavGroup() {
    return(
        <SterilizationRecordsNav.Navigator>
            <SterilizationRecordsNav.Screen component={CreatNewSterilizationRecord} name="New Sterilization" />
            <SterilizationRecordsNav.Screen component={SterilizationRecords} name="Sterilization Records" />
        </SterilizationRecordsNav.Navigator>
    )
    
}