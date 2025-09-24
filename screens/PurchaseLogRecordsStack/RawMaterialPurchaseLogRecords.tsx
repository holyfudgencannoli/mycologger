import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useLayoutEffect } from "react"
import { ThemedView } from "../../components/ThemedView"
import { ThemedText } from "../../components/ThemedText"
import { useState } from "react"
import * as React from 'react';
import { DataTable, Surface } from 'react-native-paper';
import { useAuth } from "../../scripts/AuthContext"

export default function RawMaterialPurchaseLogRecords() {
    const { user, token } = useAuth()
    const [purchaseLogs, setPurchaseLogs] = useState([])

    const FetchRawMaterialPurchaseLogs = async () => {
        const res = await fetch("http://10.0.0.45:5000/api/raw-materials/purchase-logs", {
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
                <PurchaseRecordsTable />
            </ThemedText>
        </ThemedView>
        </>
    )
    
}



const PurchaseRecordsTable = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = React.useState([
   {
     key: 1,
     name: 'Cupcake',
     calories: 356,
     fat: 16,
   },
   {
     key: 2,
     name: 'Eclair',
     calories: 262,
     fat: 16,
   },
   {
     key: 3,
     name: 'Frozen yogurt',
     calories: 159,
     fat: 6,
   },
   {
     key: 4,
     name: 'Gingerbread',
     calories: 305,
     fat: 3.7,
   },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <Surface>
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Dessert</DataTable.Title>
                <DataTable.Title numeric>Calories</DataTable.Title>
                <DataTable.Title numeric>Fat</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map((item) => (
                <DataTable.Row key={item.key}>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
                <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
                </DataTable.Row>
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
