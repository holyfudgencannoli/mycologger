

import { RawMaterialInventoryLog } from "../../interfaceModels/RawMAterialInventoryLog"

interface DataResponse {
    inventory_logs: RawMaterialInventoryLog[]
}

export const FetchRawMaterialInventoryLogs = async (token, setInventoryLogs) => {
        console.log("Asking backend for inventory logs for raw materials...")
        let data: DataResponse;
        try{
            const res = await fetch("http://10.0.0.45:5000/api/inventory/raw-materials", {
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
            setInventoryLogs(data.inventory_logs)

        } catch (err) {
            console.error("Fetch error:", err);
            throw err
        }        
    }