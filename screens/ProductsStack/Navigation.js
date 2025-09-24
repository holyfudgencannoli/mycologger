import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import CreateNewProductRecipe from './CreateNewProductRecipe';
import ProductRecords from './ProductRecords';
import CreateNewProductBatch from './CreateNewProductBatch';


const ProductsNav = createMaterialTopTabNavigator()

export default function ProductsNavGroup() {
    return(
        <ProductsNav.Navigator>
            <ProductsNav.Screen component={CreateNewProductRecipe} name="New Product" />
            <ProductsNav.Screen component={CreateNewProductBatch} name="New Batch"/>
            <ProductsNav.Screen component={ProductRecords} name="Product Records"/>
        </ProductsNav.Navigator>
    )
}