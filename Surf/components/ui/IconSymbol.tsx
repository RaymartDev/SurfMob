import { MaterialIcons } from "@expo/vector-icons";
import { StyleProp, ViewStyle } from "react-native";

export function IconSymbol({
                               name,
                               size = 24,
                               color,
                           }: {
    name: keyof typeof MaterialIcons.glyphMap; // Ensures valid icon names
    size?: number;
    color: string;
    style?: StyleProp<ViewStyle>;
}) {
    return (
        <MaterialIcons
            name={name} // Example: "home", "settings", "camera"
            size={size}
            color={color}
        />
    );
}