
import DateNavigation from "@/components/journal/DateNavigation";
import Journal, { JournalEntry } from "@/components/journal/Journal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  
  const todayKey = (d: Date) => {
    return `journal-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };

  const defaultEntry: JournalEntry = {
    graditudes: ["", "", ""],
    todos: [""],
    goodDeed: "",
    highlights: [""]
  };

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [entry, setEntry] = useState<JournalEntry>(defaultEntry);

  // Load or create today's entry
  useEffect(() => {
    const loadEntry = async () => {
      const key = todayKey(selectedDate);
      const raw = await AsyncStorage.getItem(key);
      if (raw) {
        try {
          setEntry(JSON.parse(raw));
        } catch {
          setEntry(defaultEntry);
        }
      } else {
        await AsyncStorage.setItem(key, JSON.stringify(defaultEntry));
        setEntry(defaultEntry);
      }
    };
    loadEntry();
  }, [selectedDate]);

  // Save on Button press instead of on every change to avoid excessive writes
  useEffect(() => {
    const saveEntry = async () => {
      const key = todayKey(selectedDate);
      await AsyncStorage.setItem(key, JSON.stringify(entry));
    };
    saveEntry();
  }, [entry]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DateNavigation date={selectedDate} onChangeDate={setSelectedDate} />
      <Journal entry={entry} onChangeEntry={setEntry} />
    </SafeAreaView>
  );
}
