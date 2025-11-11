import { useAuth } from "../../hooks/useAuthContext"
import { StyleSheet, Text, View, ImageBackground, Button, Alert } from 'react-native';
import { ScreenPrimative } from "../../components/ScreenPrimative";
import CreateRawMaterialPurchase from "../../components/forms/CreateRawMaterialPurchase";
import { ImageBG } from "../../components/ImageBG";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { apiFetch } from "../../services/apiFetch";



export default function NewRMPurchaseLogScreen() {
    const{ user, token } = useAuth();

    const [purchaseLogs, setPurchaseLogs] = useState([])

    useFocusEffect(
        useCallback(() => {
            const getPurchaseLogs = async() => {
                const data = await apiFetch('raw-materials/purchase-logs', 'GET', token)
            }
        }, [token])
    )

    return(
        <ImageBG image={require('../../assets/bg.jpg')}>
            <ScreenPrimative scroll>
                <CreateRawMaterialPurchase/>
            </ScreenPrimative>
        </ImageBG>
    )

}


const styles = StyleSheet.create({
});