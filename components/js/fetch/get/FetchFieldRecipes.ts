
import { FieldRecipe } from "../../interfaceModels/FieldRecipe";

interface DataResponse {
    fieldRecipes: FieldRecipe[]
}

export const FetchFieldRecipes = async (token, setFieldRecipes) => {
        console.log("Asking backend for fieldrecipes...")
        let data: DataResponse;
        try{
            const res = await fetch("http://10.0.0.45:5000/api/recipes/fields", {
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
            const names = data.fieldRecipes? data.fieldRecipes.map(fr => fr.name) : []
            console.log("Received data:", data);
            console.log("Received Field Recipe Names:", names);
            setFieldRecipes(names)

        } catch (err) {
            console.error("Fetch error:", err);
            throw err
        }        
    }