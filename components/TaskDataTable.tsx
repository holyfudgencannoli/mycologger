import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { useAuth } from '../scripts/AuthContext';
import { useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const TaskDataTable = () => {
    const { user, token, logout } = useAuth();

    let [taskRecords, setTaskRecords] = React.useState([])

    
    
    let fetchTasks = async () => {
        try {
            let res = await fetch('http://10.0.0.45:5000/api/tasks', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
                credentials: 'include'
            });
            
            console.log("HTTP status:", res.status);
            let data = await res.json();
            console.log("Fetched tasks:", data);
            setTaskRecords(data.tasks)

        } catch (err) {
            console.error("Error caught in layout:fetchTasks", {
                name: err?.name,
                message: err?.message,
                stack: err?.stack,
                full: JSON.stringify(err, Object.getOwnPropertyNames(err), 2),
            });
        }
    }

    useLayoutEffect(() => {
        fetchTasks();
    }, []);


    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );

    
    const items = taskRecords.map((task) => ({
        id: task.id,
        name: task.name,
        startTime: task.start_datetime ? new Date(task.start_datetime).toLocaleString("en-GB", {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }) : 'Not completed yet', 
        duration: task.total_time ? dayjs.duration(task.total_time, "seconds").humanize : 'Not recorded'
    }))
    

  return (
    <>
        <View style={{ flex: 1, marginTop: 60 }}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Task Name</DataTable.Title>
                    <DataTable.Title>Start Time</DataTable.Title>
                    <DataTable.Title>Duration</DataTable.Title>
                </DataTable.Header>
                <ScrollView>
                    {items.map((item) => (
                        <DataTable.Row key={item.id}>
                            <DataTable.Cell>{item.name}</DataTable.Cell>
                            <DataTable.Cell numeric>{item.startTime}</DataTable.Cell>
                            <DataTable.Cell numeric>{item.duration}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </ScrollView>

                
            </DataTable>
        </View>
        
    </>
  );
};

export default TaskDataTable;