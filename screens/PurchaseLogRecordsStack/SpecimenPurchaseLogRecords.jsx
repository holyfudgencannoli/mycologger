import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useLayoutEffect } from "react"
import { ThemedView } from "../../components/ThemedView"
import { ThemedText } from "../../components/ThemedText"
import { useState } from "react"

export default function SpecimenPurchaseLogRecords() {

    const [purchaseLogs, setPurchaseLogs] = useState([])

    const FetchSpecimenPurchaseLogs = async () => {
        const res = await fetch("http://10.0.0.45:5000/api/specimen/purchase-logs", {
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
            FetchSpecimenPurchaseLogs()
        }, [])
    )

    useLayoutEffect(() => {
        FetchSpecimenPurchaseLogs()
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