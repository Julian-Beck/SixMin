import { ThemedText } from "@/components/atomic/themed-text";
import { Button, View } from "react-native";

export default function DateNavigation({ date, onChangeDate }: { date: Date; onChangeDate: (date: Date) => void }) {
  
  const goToPreviousDay = () => {
    const previousDay = new Date(date);
    previousDay.setDate(date.getDate() - 1);
    onChangeDate(previousDay);
  };
  
  const goToNextDay = () => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    onChangeDate(nextDay);
  };

  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      marginBottom: 20
    }}>
        <Button
        title="<"
        onPress={goToPreviousDay}
      />
      <ThemedText type="default">{date.toDateString()}</ThemedText>
      <Button
        title=">"
        onPress={goToNextDay}
      />
    </View>    

  );
}