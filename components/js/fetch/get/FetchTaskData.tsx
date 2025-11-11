import { TaskDataObject } from "../../interfaceModels/TaskDataObjects"


interface DataResponse {
    tasks: TaskDataObject[]
}

export const FetchTasks = async (token, setTasks) => {
    console.log("Asking backend for tasks...")
    let data: DataResponse;
    try{
        const res = await fetch("http://10.0.0.45:5000/api/tasks", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if (!res.ok) {
            throw new Error(`Error fetching response: ${res.status} ${res.statusText}`);
        }
        console.log("receiving data")

        data = await res.json()
        console.log("Received data:", data);
        setTasks(data.tasks)

    } catch (err) {
        console.error("Fetch error:", err);
        throw err
    }        
}