import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useLayoutEffect } from "react"
import { ThemedView } from "../../components/ThemedView"
import { ThemedText } from "../../components/ThemedText"
import { useState } from "react"
import * as React from 'react';
import { DataTable, Surface } from 'react-native-paper';
import { useAuth } from "../../hooks/useAuthContext"
import { FetchRawMaterialPurchaseLogs } from "../../components/js/fetch/get/FetchRawMaterialPurchaseLogs"
import { FetchReceipts } from "../../components/js/fetch/get/FetchReceipts"
import { PurchaseLog } from "../../components/js/interfaceModels/PurchaseLog"
import { RawMaterial } from "../../components/js/interfaceModels/RawMaterial"
import { Receipt } from "../../components/js/interfaceModels/Receipt"
import { Vendor } from "../../components/js/interfaceModels/Vendor"
import { FetchRawMaterials } from "../../components/js/fetch/get/FetchRawMaterials"
import { FetchVendors } from "../../components/js/fetch/get/FetchVendors"
import { FetchRawMaterialInventoryLogs } from "../../components/js/fetch/get/FetchRawMaterialInventoryLogs"
import { RawMaterialInventoryLog } from "../../components/js/interfaceModels/RawMaterialInventoryLog"
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native"
import PurchaseLogModal from "../PurchaseRecordDocumentation/PurchaseLogModal"
import { ScrollableDataTable } from "../../components/DataListWrapper"

export default function RawMaterialPurchaseLogRecords() {
    const { user, token } = useAuth()
    const [purchaseLogs, setPurchaseLogs] = useState<PurchaseLog[]>([])
    const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([])
    const [receipts, setReceipts] = useState<Receipt[]>([])
    const [vendors, setVendors] = useState<Vendor[]>([])
    const [inventoryLogs, setInventoryLogs] = useState<RawMaterialInventoryLog[]>([])

    useFocusEffect(
        useCallback(() => {
            FetchRawMaterialPurchaseLogs(token, setPurchaseLogs)
            FetchReceipts(token, setReceipts)
            FetchRawMaterials(token, setRawMaterials)
            FetchVendors(token, setVendors)
            FetchRawMaterialInventoryLogs(token, setInventoryLogs)
        }, [token])
    )

    useLayoutEffect(() => {
        FetchRawMaterialPurchaseLogs(token, setPurchaseLogs)
        FetchReceipts(token, setReceipts)
        FetchRawMaterials(token, setRawMaterials)
        FetchVendors(token, setVendors)
        FetchRawMaterialInventoryLogs(token, setInventoryLogs)
    }, [token])

    const items = purchaseLogs.map((log: PurchaseLog) => {
        console.log("Mapping material data...")
        const material = rawMaterials.find( rm => rm.id === log.item_id)
        const receipt = receipts.find(r => r.id === log.receipt_entry_id)
        const inventory = inventoryLogs.find(i => i.id === log.inventory_log_id)

        return {
            ...log,
            rawMaterialName: material?.name ?? "Unknown",
            rawMaterialCategory: material?.category ?? "Unknown",
            inventoryAmount: inventory?.amount_on_hand,
            inventoryUnit: inventory?.amount_on_hand_unit
            
        }
    })

    const columns = [
        {key: 'name', title: 'Item Name'},
        {key: 'category', title: 'Category'},
        {key: 'amnountOnHand', title: 'Amount'},

    ]


    return(
        <>
        <ThemedView>
            {purchaseLogs ? purchaseLogs.map((log) =>(
                <Surface key={log.id}>
                    <ThemedText>{log.item_id ?? "Nothing Here"}</ThemedText>
                </Surface> 
            )) : (
                <></>
            )}
            <ScrollableDataTable
                data={items}
                columns={columns}
            
            />
        </ThemedView>
        </>
    )
    
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "grey",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    maxHeight: "80%",
  },
})