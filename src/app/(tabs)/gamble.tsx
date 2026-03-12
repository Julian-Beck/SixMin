import Casino from "@/components/gamble/Casino";
import ItemList from "@/components/gamble/ItemList";
import { defaultTodayTodo, loadTodo, saveTodo } from "@/data/storage";
import { TodaysTodo } from "@/data/types";
import stylesGamble from "@/style/gamble";
import { useEffect, useState } from "react";
import { ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [todoEntry, setTodoEntry] = useState<TodaysTodo>(defaultTodayTodo);
  const [todos, setTodos] = useState<string[]>([]);
  const [dones, setDones] = useState<string[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      await loadTodo().then(todoEntry => {
        setTodoEntry(todoEntry);
        setTodos(todoEntry.todos);
        setDones(todoEntry.done);
      });
    };
    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      await saveTodo({ ...todoEntry, done: dones });
    };
    saveTodos();
  }, [dones]);
  
  const checkTodo = (todoName: string) => {
    if (!dones.includes(todoName)) setDones(prev => [...prev, todoName]);
  };

  const uncheckTodo = (todoName: string) => {
    setDones(prev => prev.filter(d => d !== todoName));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView style={stylesGamble.containerCenter}>
        {todos.length-1 > dones.length && <ItemList 
          title="TODO"
          items={todos.filter(todo => todo && !dones.includes(todo))}
          onItemPress={checkTodo}
          color="#5e81ac"
        /> }
        {todos.length-1 > dones.length && <ItemList 
          title="DONE"
          items={dones}
          onItemPress={uncheckTodo}
          color="#81a1c1"
        /> }

        {/* if all todos are done */}
        {todos.length-1 == dones.length && 
        <Casino
          count={dones.length}
        />}
      </ScrollView>
    </SafeAreaView>
  );
}


// Button alternative for future usage (needs styling)
// <TouchableOpacity style={[stylesGamble.item, stylesGamble.done]} key={index} onPress={() => uncheckTodo(done)}>
//             <ThemedText style={{textDecorationLine: "line-through"}}>{done}</ThemedText>
//           </TouchableOpacity>