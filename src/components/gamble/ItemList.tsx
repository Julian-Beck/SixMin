

import { ThemedText } from "@/components/atomic/themed-text";
import stylesGamble from "@/style/gamble";
import { Button, View } from "react-native";

type ItemListProps = {
  title: string,
  items: string[],
  onItemPress: (itemName: string) => void,
  color: string,
};

export default function ItemList({
  title,
  items,
  onItemPress,
  color
}: ItemListProps) {
    return (
        <View>
            <ThemedText style={stylesGamble.item}>{title}</ThemedText>
            {items.map((done, index) => (
            <View style={[stylesGamble.item]}>
                <Button
                color={color}
                key={index}
                title={done}
                onPress={() => onItemPress(done)}
                />
            </View>
            ))}
        </View>
    );
}
