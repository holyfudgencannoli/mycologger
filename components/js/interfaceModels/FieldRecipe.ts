import { Field } from "./Field";

export interface FieldRecipe{
    id: number;
    name: string;
    created_at: string;
    last_updated: string;
    cost: number;
    // field: Field
}