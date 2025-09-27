
import { Receipt } from "../../interfaceModels/Receipt";

interface DataResponse {
    receipts: Receipt[]
}

export const FetchReceipts = async (token, setReceipts) => {
        console.log("Asking backend for receipts...")
        let data: DataResponse;
        try{
            const res = await fetch("http://10.0.0.45:5000/api/receipts", {
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
            setReceipts(data.receipts)

        } catch (err) {
            console.error("Fetch error:", err);
            throw err
        }        
    }