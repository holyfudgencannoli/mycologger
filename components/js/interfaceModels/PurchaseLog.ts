export interface PurchaseLog{
    id: number;
    brand: string;
    log_date: string;
    purchase_date: string;
    purchase_amount: number;
    purchase_unit: string;
    cost: number;
    notes: string;
    receipt_entry_id: number;
    receipt_entry: object;
    inventory_log_id: number;
    inventory_log: object;
    item_id: number;
    item: object;
    vendor_id: number;
    vendor: object;
    user_id: number
    user: object
    rawMaterialName: string;
    rawMaterialCategory: string;
    inventoryAmount: number;
    inventoryUnit: string;
}