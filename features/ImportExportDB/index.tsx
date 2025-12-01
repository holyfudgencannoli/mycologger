import { Alert, Button, View } from "react-native";
import { useDatabaseBackup } from "../../hooks/useDatabaseBackup";
import { ScreenPrimative } from "../../components/ScreenPrimative";
import * as FileSystem from 'expo-file-system/legacy'
import { useSQLiteContext } from "expo-sqlite";
import { safeExec } from "../../data/db/utils";
import { migrateDbIfNeeded } from "../../data/db/migrations";
// import { NewTables } from "../../data/db/new_tables";
import { useDatabaseInspector } from "../../hooks/useDatabaseInspector";
import { useEffect, useState } from "react";
import { Surface } from "react-native-paper";

export default function ImpExpDB() {
    const backup = useDatabaseBackup();
    const [lastBackupUri, setLastBackupUri] = useState('')
    const inspect = useDatabaseInspector(lastBackupUri)

    useEffect(() => {
        console.log(inspect)
    }, [])

    const handleDeleteAll = async() => {
        const db = useSQLiteContext();

        await safeExec(db, `DROP TABLE IF EXISTS users;`)
        await safeExec(db, `DROP TABLE IF EXISTS inventory_items;`)
        await safeExec(db, `DROP TABLE IF EXISTS raw_materials;`)
        await safeExec(db, `DROP TABLE IF EXISTS raw_material_inventory_logs;`)
        await safeExec(db, `DROP TABLE IF EXISTS raw_material_purchase_logs;`)
        await safeExec(db, `DROP TABLE IF EXISTS raw_material_usage_logs;`)
        await safeExec(db, `DROP TABLE IF EXISTS bio_materials;`)
        await safeExec(db, `DROP TABLE IF EXISTS bio_material_inventory_logs;`)
        await safeExec(db, `DROP TABLE IF EXISTS bio_material_purchase_logs;`)
        await safeExec(db, `DROP TABLE IF EXISTS bio_material_usage_logs;`)
        await safeExec(db, `DROP TABLE IF EXISTS hardware_items;`)
        await safeExec(db, `DROP TABLE IF EXISTS hardware_item_inventory_logs;`)
        await safeExec(db, `DROP TABLE IF EXISTS hardware_item_purchase_logs;`)
        await safeExec(db, `DROP TABLE IF EXISTS hardware_item_usage_logs;`)
        await safeExec(db, `DROP TABLE IF EXISTS consumable_items;`)
        await safeExec(db, `DROP TABLE IF EXISTS consumable_item_inventory_logs;`)
        await safeExec(db, `DROP TABLE IF EXISTS consumable_item_purchase_logs;`)
        await safeExec(db, `DROP TABLE IF EXISTS consumable_item_usage_logs;`)
        await safeExec(db, `DROP TABLE IF EXISTS recipes;`)
        await safeExec(db, `DROP TABLE IF EXISTS recipes_batches;`)
        await safeExec(db, `DROP TABLE IF EXISTS recipe_batch_inventory_logs;`)
        await safeExec(db, `DROP TABLE IF EXISTS culture_media;`)
        await safeExec(db, `DROP TABLE IF EXISTS agar_culture;`)
        await safeExec(db, `DROP TABLE IF EXISTS liquid_culture;`)
        await safeExec(db, `DROP TABLE IF EXISTS spawn_culture;`)
        await safeExec(db, `DROP TABLE IF EXISTS sterilizations;`)
        await safeExec(db, `DROP TABLE IF EXISTS inoculations;`)
        await safeExec(db, `DROP TABLE IF EXISTS germinations;`)
        await safeExec(db, `DROP TABLE IF EXISTS colonizations;`)
        await safeExec(db, `DROP TABLE IF EXISTS contaminations;`)
        await safeExec(db, `DROP TABLE IF EXISTS harvests;`)
        await safeExec(db, `DROP TABLE IF EXISTS vendors;`)
        await safeExec(db, `DROP TABLE IF EXISTS tasks;`)
        await safeExec(db, `DROP TABLE IF EXISTS brands;`)

    }

    return(
        <ScreenPrimative scroll>            
            <Button 
                title="export" 
                onPress={async () => {
                    
                    try {
                        const backupUri = await backup.exportDb();  // Ensure this is an async call
                        console.log("Backup URI:", backupUri);
                        console.log('Pressed')
                        setLastBackupUri(backupUri)
                    } catch (error) {
                        console.error("Error during export:", error);
                    }
                }} 
            />
            <Button 
                title="import"
                onPress={async () => {
                    
                    try {
                        await backup.importDb();  // Ensure this is an async call
                        console.log('Pressed')
                    } catch (error) {
                        console.error("Error during export:", error);
                    }
                }}
            />
            <Button 
                title="Delete All Tables"
                onPress={async () => {
                    Alert.alert(
                        'confirm',
                        "Are you sure you want to delete all things?",
                        [
                            {
                                text: 'Yes',
                                onPress: async() => await handleDeleteAll()
                            },
                            {
                                text: 'No',
                                onPress: () => {console.log('No pressed')},
                                style: 'cancel'
                            }
                        ],
                        
                    )
                }}
            />
            {/* <Button 
                title="Create New Empty Tables"
                onPress={async () => {
                    try {
                        await NewTables(db)
                        console.log('Pressed')
                    } catch (error) {
                        console.error("Error during export:", error);
                    }
                }}
            /> */}
          
        </ScreenPrimative>
    )
}