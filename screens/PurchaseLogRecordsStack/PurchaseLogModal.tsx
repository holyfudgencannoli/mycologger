import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, Button } from "react-native";
import { Modal, Portal, Surface } from "react-native-paper";
import { PurchaseLog } from "../../components/js/interfaceModels/PurchaseLog";

type Props = {
  item: PurchaseLog; // adjust type to your mapped items
  showModal
  hideModal
  visible
};

const PurchaseLogModal: React.FC<Props> = ({ item, showModal, hideModal, visible }) => {
  

  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <ScrollView>
                <Surface style={styles.itemContainer}>
                    <Text style={styles.title}>Item Name: {item.rawMaterialName}</Text>
                    <Text>Category: {item.rawMaterialCategory}</Text>
                    <Text>
                        Inventory: {item.inventoryAmount} {item.inventoryUnit}
                    </Text>
                    <Text>Cost: ${item.cost}</Text>
                    <Text>Receipt ID: {item.receipt_entry_id ?? "N/A"}</Text>
                    <Text>Vendor ID: {item.vendor_id ?? "N/A"}</Text>
                    <Text>Purchase Date: {item.purchase_date ?? "N/A"}</Text>
                </Surface>
          </ScrollView>
          <Button title="Close" onPress={hideModal} />
        </Modal>
      </Portal>
    </>
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
  button: {
    width: 100,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
    color: 'white',
  },
});

export default PurchaseLogModal;
