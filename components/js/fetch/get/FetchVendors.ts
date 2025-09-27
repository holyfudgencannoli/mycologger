
import { Vendor } from "../../interfaceModels/Vendor";

interface DataResponse {
    vendors: Vendor[]
}

export const FetchVendors = async (token, setVendors) => {
        console.log("Asking backend for vendors...")
        let data: DataResponse;
        try{
            const res = await fetch("http://10.0.0.45:5000/api/vendors", {
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
            setVendors(data.vendors)

        } catch (err) {
            console.error("Fetch error:", err);
            throw err
        }        
    }