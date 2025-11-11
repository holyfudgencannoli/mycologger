import * as React from 'react';
import { DataTable, Surface } from 'react-native-paper';
import { ImageBackground, StyleSheet } from 'react-native';
import { FetchRawMaterialInventoryLogs } from '../../components/js/fetch/get/FetchRawMaterialInventoryLogs';
import { useAuth } from '../Authentication/utils/AuthContext';
import { FetchRawMaterials } from '../../components/js/fetch/get/FetchRawMaterials';
import { RawMaterial } from '../../components/js/interfaceModels/RawMaterial';
import { RawMaterialInventoryLog } from '../../components/js/interfaceModels/RawMaterialInventoryLog';
import { SafeAreaView } from 'react-native-safe-area-context';

const RawMaterialInventory = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const [rawMaterials, setRawMaterials] = React.useState([])
  const [rawMaterialInventoryLogs, setRawMaterialInventoryLogs] = React.useState([])
  const {user, token} = useAuth();

  React.useLayoutEffect(() => {
    FetchRawMaterialInventoryLogs(token, setRawMaterialInventoryLogs)
    FetchRawMaterials(token, setRawMaterials)
  }, [token])

    const items = rawMaterialInventoryLogs.map((rmInventoryLog: RawMaterialInventoryLog) => {
        console.log("Mapping material data...")
        const rawMaterialObject = rawMaterials.find(rm => rm.id === rmInventoryLog.item_id)

        return {
            ...rmInventoryLog,
            rawMaterialName: rawMaterialObject?.name ?? "Unknown",
            rawMaterialCategory: rawMaterialObject?.category ?? "Unknown",
            
        }
    })

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <ImageBackground
            source={require('../../assets/bg.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView  style={styles.container}>
                <Surface style={styles.surfaceMetaContainer}>
                    <DataTable>
                        <DataTable.Header  style={styles.tableHeader}>
                            <DataTable.Title textStyle={styles.headerText}>Dessert</DataTable.Title>
                            <DataTable.Title textStyle={styles.headerText}>Calories</DataTable.Title>
                            <DataTable.Title textStyle={styles.headerText}>Fat</DataTable.Title>
                        </DataTable.Header>

                        {items.slice(from, to).map((item) => (
                            <DataTable.Row key={item.key}>
                            <DataTable.Cell  textStyle={styles.rowText}>{item.rawMaterialName}</DataTable.Cell>
                            <DataTable.Cell  textStyle={styles.rowText}>{item.rawMaterialCategory}</DataTable.Cell>
                            <DataTable.Cell  textStyle={styles.rowText}>{item.amount_on_hand} {item.amount_on_hand_unit}</DataTable.Cell>
                            </DataTable.Row>
                        ))}

                        <DataTable.Pagination
                            style={styles.tablePagination}
                            page={page}
                            numberOfPages={Math.ceil(items.length / itemsPerPage)}
                            onPageChange={(page) => setPage(page)}
                            label={`${from + 1}-${to} of ${items.length}`}
                            numberOfItemsPerPageList={numberOfItemsPerPageList}
                            numberOfItemsPerPage={itemsPerPage}
                            onItemsPerPageChange={onItemsPerPageChange}
                            showFastPaginationControls
                            selectPageDropdownLabel={'Rows per page'}
                            dropdownItemRippleColor={'black'}
                            paginationControlRippleColor={'black'}
                        />
                    </DataTable>
                </Surface>
            </SafeAreaView>
        </ImageBackground>
  );
};


export default RawMaterialInventory;
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  surfaceMetaContainer: {
    backgroundColor: 'rgba(55,255,55,0.4)',
    borderRadius: 12,
    padding: 8,
    width: 350,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  tableHeader: {
    backgroundColor: "rgba(70,130,180,0.8)", // steelblue
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
  },
  tableRow: {
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  tableRowAlt: {
    backgroundColor: "rgba(245,245,245,0.9)",
  },
  rowText: {
    color: "black",
    fontSize: 14,
  },
  tablePagination: {
    backgroundColor: "rgba(70,130,180,0.15)",
    color: 'black'
  },
});
