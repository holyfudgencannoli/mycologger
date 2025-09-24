import CreateTaskForm from "./CreateTaskForm"
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import TaskRecords from "./TaskRecords"

const TasksNav = createMaterialTopTabNavigator()

export default function TasksNavGroup() {
    return(
        <TasksNav.Navigator>
            <TasksNav.Screen component={CreateTaskForm} name='New Task'/>
            <TasksNav.Screen component={TaskRecords} name='Task Records'/>
        </TasksNav.Navigator>
    )
}
