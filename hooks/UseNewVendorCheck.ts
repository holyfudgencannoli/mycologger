import { fetchVendorData } from "../services/DataObjectFetchers/VendorNames"


export default function newVendorCheck({vendor, token, setVendorsNames, vendorsNames, setNewVendor}) {    
    let newVendor: boolean;
    
    fetchVendorData(token, setVendorsNames)

    if (vendorsNames.includes(vendor)) {
        setNewVendor(false)
    } else {
        setNewVendor(true)
    }

    return newVendor
}