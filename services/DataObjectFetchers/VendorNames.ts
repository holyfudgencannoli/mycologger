import { useSQLiteContext } from "expo-sqlite";
import { apiFetch } from "../apiFetch";
import * as Vendor from './../../data/db/vendors'
import { VendorType } from "./../../data/db/vendors"; 

export const fetchVendorData = async(setVendors: (setData: VendorType[]) => void    ) => {
    const db = useSQLiteContext();

    try {
        const data: VendorType[] = await Vendor.readAll(db)
        setVendors(data)
        return data
    } catch (error) {
        console.error(error)
    }
}