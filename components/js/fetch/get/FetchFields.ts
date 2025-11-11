
import { Field } from "../../interfaceModels/Field";

interface DataResponse {
    fields: Field[]
}

export const FetchFields = async (token, setFields) => {
        console.log("Asking backend for fields...")
        let data: DataResponse;
        try{
            const res = await fetch("http://10.0.0.45:5000/api/fields", {
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
            setFields(data.fields)

        } catch (err) {
            console.error("Fetch error:", err);
            throw err
        }        
    }