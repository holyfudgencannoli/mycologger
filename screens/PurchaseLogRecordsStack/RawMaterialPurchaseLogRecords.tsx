import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useLayoutEffect } from "react"
import { ThemedView } from "../../components/ThemedView"
import { ThemedText } from "../../components/ThemedText"
import { useState } from "react"
import * as React from 'react';
import { DataTable, Surface } from 'react-native-paper';
import { useAuth } from "../../scripts/AuthContext"
import { FetchRawMaterialPurchaseLogs } from "../../components/js/fetch/get/FetchRawMaterialPurchaseLogs"
import { FetchReceipts } from "../../components/js/fetch/get/FetchReceipts"
import { PurchaseLog } from "../../components/js/interfaceModels/PurchaseLog"
import { RawMaterial } from "../../components/js/interfaceModels/RawMaterial"
import { Receipt } from "../../components/js/interfaceModels/Receipt"
import { Vendor } from "../../components/js/interfaceModels/Vendor"
import { FetchRawMaterials } from "../../components/js/fetch/get/FetchRawMaterials"
import { FetchVendors } from "../../components/js/fetch/get/FetchVendors"
import { FetchRawMaterialInventoryLogs } from "../../components/js/fetch/get/FetchRawMaterialInventoryLogs"
import { RawMaterialInventoryLog } from "../../components/js/interfaceModels/RawMAterialInventoryLog"
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native"
import PurchaseLogModal from "./PurchaseLogModal"

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
            <PurchaseRecordsTable items={items} />
        </ThemedView>
        </>
    )
    
}



const PurchaseRecordsTable = ({items}) => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
    const [visible, setVisible] = useState(false);
    
      const showModal = () => setVisible(true);
      const hideModal = () => setVisible(false);


  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <Surface style={styles.surface}>
        
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Item Name</DataTable.Title>
                <DataTable.Title>Category</DataTable.Title>
                <DataTable.Title>Quantity</DataTable.Title>
                <DataTable.Title>Cost</DataTable.Title>

            </DataTable.Header>

            {items.slice(from, to).map((item) => (
                <TouchableOpacity onPress={showModal}>
                    <DataTable.Row key={item.key}>
                        <DataTable.Cell>{item.rawMaterialName}</DataTable.Cell>
                        <DataTable.Cell>{item.rawMaterialCategory}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.inventoryAmount} {item.inventoryUnit}</DataTable.Cell>
                        <DataTable.Cell numeric>${item.cost}</DataTable.Cell>
                    </DataTable.Row> 
                    <PurchaseLogModal hideModal={hideModal} visible={visible} showModal={showModal} item={item} />
                </TouchableOpacity>
            ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(items.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${items.length}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={'Rows per page'}
            />
        </DataTable>
    </Surface>
  );
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