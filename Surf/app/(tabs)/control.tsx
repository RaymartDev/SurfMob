import { View, Text, StatusBar, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { CornerDownLeft, CircleStop, CircleArrowLeft, CircleArrowRight, ChevronsLeftRightEllipsis  } from 'lucide-react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const control = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleBoatActivity = () => {
        setIsActive(!isActive);
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />

                {/* Header */}
                <View style={styles.header}>
                    <ChevronsLeftRightEllipsis color="#0284c7" size={28}/>
                    <Text style={styles.headerTitle}>In-Control</Text>
                </View>

                <Image
                    source={require('@/app/(tabs)/images/dashboardboat.jpg')}
                    style={styles.streaming} />

                <View style={styles.card}>
                    <View style={styles.arrows}>
                        <CircleArrowLeft size={48} color="#70affa" strokeWidth={1.50} />
                        <CircleStop size={48} color="#ef4444" strokeWidth={1.50} />
                        <CircleArrowRight size={48} color="#70affa" strokeWidth={1.50} />
                    </View>

                    <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: isActive ? "#ef4444" : "#70affa" }]}
                        onPress={toggleBoatActivity}
                    >
                        {isActive ? <CircleStop color="white" size={20} /> : <CornerDownLeft color="white" size={20} />}
                        <Text style={styles.actionButtonText}>{isActive ? "Returning" : "Return to the base"}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#e2e8f0",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 12,
        color: "#0f172a",
    },
    headerText: {
        fontSize: 22,
        color: "#9e9e9e",
    },
    streaming: {
        width: '100%',
        height: '65%',
    },
    arrows: {
        flexDirection: 'row',
        justifyContent:  'space-evenly',
        margin: 16,
    },
    safeZoneContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeZone: {
        backgroundColor: 'green',
        justifyContent: 'center',
        color: 'white',
        borderRadius: 20,
        textAlign: 'center',
        width: '50%',
        padding: 8,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,

    },
    actionButton: {
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        borderRadius: 8,
        gap: 8,
    },
    actionButtonText: {
        color: "white",
        fontWeight: "600",
    },
})
export default control