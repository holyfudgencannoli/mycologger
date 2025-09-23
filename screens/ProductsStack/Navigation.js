import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import CreateNewProductForm from "./screens/HomeStack/CreateNewProductForm";
import CreateNewProductBatchForm from "./screens/HomeStack/CreateNewProductBatchForm";


const ProductsNav = createMaterialTopTabNavigator()

export default function ProductsNavGroup() {
    return(
        <ProductsNav.Navigator>
            <ProductsNav.Screen component={CreateNewProductForm} name="New Product" />
            <ProductsNav.Screen component={CreateNewProductBatchForm} name="New Batch"/>
        </ProductsNav.Navigator>
    )
}