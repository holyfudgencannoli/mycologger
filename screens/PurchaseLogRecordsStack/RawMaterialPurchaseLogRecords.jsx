import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useLayoutEffect } from "react"
import { ThemedView } from "../../components/ThemedView"
import { ThemedText } from "../../components/ThemedText"
import { useState } from "react"

export default function RawMaterialPurchaseLogRecords() {

    const [purchaseLogs, setPurchaseLogs] = useState([])

    const FetchRawMaterialPurchaseLogs = async () => {
        const res = await fetch("http://10.0.0.45:5000/api/raw-material/purchase-logs", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        
        const data = await res.json()
        
        setPurchaseLogs(data.purchase_logs)
    }

    useFocusEffect(
        useCallback(() => {
            FetchRawMaterialPurchaseLogs()
        }, [])
    )

    useLayoutEffect(() => {
        FetchRawMaterialPurchaseLogs()
    }, [])

    return(
        <>
        <ThemedView>
            <ThemedText>
                Helllooooo
            </ThemedText>
        </ThemedView>
        </>
    )
    
}