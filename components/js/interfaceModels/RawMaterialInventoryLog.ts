export interface RawMaterialInventoryLog {
    id: number;
    amount_on_hand: number;
    amount_on_hand_unit: string;
    periodic_auto_replace: number;
    periodic_auto_replace_unit: string;
    created_at: string;
    last_updated: string;
    item_id: number;
}