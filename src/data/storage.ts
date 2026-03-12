import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalEntry, TodaysTodo } from '@/data/types';



export const defaultEntry: JournalEntry = {
    graditudes: ["", "", ""],
    todos: [""],
    learning: "",
    goodDeed: "",
    highlights: [""]
};

const todayKey = (d: Date) => {
    return `journal-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

export const defaultTodayTodo: TodaysTodo = {
    date: todayKey(new Date()),
    todos: [],
    done: [],
}

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

export const saveJournalEntry = async (date: Date, entry: JournalEntry) => {
    const key = todayKey(date);
    await AsyncStorage.setItem(key, JSON.stringify(entry));
    
    await loadTodo().then(todoEntry => {
    if (todoEntry && todoEntry.todos != entry.todos){
        todoEntry.todos = entry.todos
        AsyncStorage.setItem("todaysTodo", JSON.stringify(todoEntry));
    }
    });
};

export const loadTodo = async () => {
    const date = new Date();
    const todayTodoKey = "todaysTodo";
    console.log("bumbums")

    const raw = await AsyncStorage.getItem(todayTodoKey);
    if (raw) {
        try {
            const res: TodaysTodo = JSON.parse(raw);
            return res;
        } catch {
            return defaultTodayTodo;
        }
    } else {
        await AsyncStorage.setItem(todayTodoKey, JSON.stringify(defaultTodayTodo));
        return defaultTodayTodo;
    }
};


export const saveTodo = async (todoEntry: TodaysTodo) => {
    const key = "todaysTodo";
    await AsyncStorage.setItem(key, JSON.stringify(todoEntry));
};

export const exportAsyncStorage = async () => {
  try {
    // Get all keys from AsyncStorage
    const allKeys = await AsyncStorage.getAllKeys();
    
    // Get all data
    const allData = await AsyncStorage.multiGet(allKeys);
    
    // Convert to object format
    const dataObject: Record<string, string | null> = {};
    allData.forEach(([key, value]) => {
      dataObject[key] = value;
    });
    
    // Convert to JSON string
    const jsonString = JSON.stringify(dataObject, null, 2);
    
    console.log('Data exported successfully');
    return jsonString;
  } catch (error) {
    console.error('Error exporting data:', error);
  }
};

export const clearAsyncStorage = async () => {
  try {
    AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};