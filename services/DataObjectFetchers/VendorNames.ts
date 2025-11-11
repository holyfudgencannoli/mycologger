import { apiFetch } from "../apiFetch";

export const fetchVendorData = async(token: string, setVendorsNames: any) => {
    try {
        const data: any = await apiFetch('/vendors', 'GET', token)
        const vendorsObjs = Array.isArray(data.vendors) ? data.vendors : [];
        if (vendorsObjs.length === 0) return;
        const vendorsNamesList = vendorsObjs.map((obj: any) => obj.name).filter(Boolean).map((n: any) => ({label: n, value: n}))
        setVendorsNames(vendorsNamesList)
    } catch (error) {
        console.error(error)
    }
    return 
}