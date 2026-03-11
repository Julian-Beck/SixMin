
import DateNavigation from "@/components/journal/DateNavigation";
import Journal from "@/components/journal/Journal";
import { loadJournalEntry, saveJournalEntry, defaultEntry } from "@/data/storage";
import { JournalEntry } from "@/data/types";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [entry, setEntry] = useState<JournalEntry>(defaultEntry);

  // Load or create today's entry
  useEffect(() => {
    const loadEntry = async () => {
      const entry = await loadJournalEntry(selectedDate);
      setEntry(entry);
    };
    loadEntry();
  }, [selectedDate]);

  // Save on Button press instead of on every change to avoid excessive writes
  useEffect(() => {
    const saveEntry = async () => {
      await saveJournalEntry(selectedDate, entry);
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
