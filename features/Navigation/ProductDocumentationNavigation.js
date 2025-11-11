import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import CreateNewProductRecipe from '../ProductRecipeRegistration/CreateNewProductRecipe';
import ProductRecords from '../ProductManufactureDocumentation/ProductRecords';
import CreateNewProductBatch from '../ProductManufactureDocumentation/CreateNewProductBatch';


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