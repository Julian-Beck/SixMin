import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalEntry } from '@/data/types';

export const defaultEntry: JournalEntry = {
    graditudes: ["", "", ""],
    todos: [""],
    goodDeed: "",
    highlights: [""]
};

const todayKey = (d: Date) => {
    return `journal-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

export const loadJournalEntry = async (date: Date) => {
    const key = todayKey(date);
    const raw = await AsyncStorage.getItem(key);
    if (raw) {
        try {
            const res: JournalEntry = JSON.parse(raw);
            return res;
        } catch {
            return defaultEntry;
        }
    } else {
        await AsyncStorage.setItem(key, JSON.stringify(defaultEntry));
        return defaultEntry;
    }
};

  // Save on Button press instead of on every change to avoid excessive writes
 export const saveJournalEntry = async (date: Date, entry: JournalEntry) => {
      const key = todayKey(date);
      await AsyncStorage.setItem(key, JSON.stringify(entry));
};