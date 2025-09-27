

import { PurchaseLog } from "../../interfaceModels/PurchaseLog"

interface DataResponse {
    purchase_logs: PurchaseLog[]
}

export const FetchRawMaterialPurchaseLogs = async (token, setPurchaseLogs) => {
        console.log("Asking backend for purchase logs for raw materials...")
        let data: DataResponse;
        try{
            const res = await fetch("http://10.0.0.45:5000/api/purchase-logs/raw-materials", {
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
            setPurchaseLogs(data.purchase_logs)

        } catch (err) {
            console.error("Fetch error:", err);
            throw err
        }        
    }