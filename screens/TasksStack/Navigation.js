const TasksNav = createMaterialTopTabNavigator()

export default function TasksNavGroup() {
    return(
        <TasksNav.Navigator>
            <TasksNav.Screen component={CreateTaskForm} name='New Task'/>
        </TasksNav.Navigator>
    )
}
