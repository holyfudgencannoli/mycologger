
import { RawMaterial } from "../../interfaceModels/RawMaterial";

interface DataResponse {
    raw_materials: RawMaterial[]
}

export const FetchRawMaterials = async (token, setRawMaterials) => {
        console.log("Asking backend for raw material data...")
        let data: DataResponse;
        try{
            const res = await fetch("http://10.0.0.45:5000/api/raw-materials", {
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
            setRawMaterials(data.raw_materials)

        } catch (err) {
            console.error("Fetch error:", err);
            throw err
        }        
    }