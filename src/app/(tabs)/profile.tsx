
import { ThemedText } from "@/components/atomic/themed-text";
import { clearAsyncStorage, exportAsyncStorage } from "@/data/storage";
import { useState } from "react";
import { Button, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [exportContent, setExportContent] = useState("");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <ScrollView>
      <Text>This is the Profile View</Text>
      <Button title="Clear data"
        onPress={async () => clearAsyncStorage()}/>
      <Button title="Export data"
        onPress={async () => {await exportAsyncStorage().then((content) => setExportContent(content!=undefined?content:""))}}/>

      {exportContent!= "" && <ThemedText>Export: {"\n" + exportContent}</ThemedText>}
    </ScrollView>
    </SafeAreaView>
  );
}
