import JournalSection from "@/components/journal/JournalSection";
import { useEffect, useState } from "react";
import { Button, Keyboard, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { JournalEntry } from "@/data/types";
import stylesJournal from "@/style/journal";

type JournalProps = {
  entry: JournalEntry;
  onChangeEntry?: (entry: JournalEntry) => void;
};

export default function Journal({ entry, onChangeEntry }: JournalProps) {
  const [graditudes, setGraditudes] = useState<string[]>(entry.graditudes ?? ["", "", ""]);
  const [todos, setTodos] = useState<string[]>(entry.todos ?? [""]);
  const [goodDeed, setGoodDeed] = useState<string>(entry.goodDeed ?? "");
  const [learning, setLearning] = useState<string>(entry.learning ?? "");
  const [highlights, setHighlights] = useState<string[]>(entry.highlights ?? [""]);
  const [activeSection, setActiveSection] = useState<string>("");
  const [lastYPos, setLastYPos] = useState<number>(0);

  // Keep local state in sync with prop changes
  useEffect(() => {
    setGraditudes(entry.graditudes ?? ["", "", ""]);
    setTodos(entry.todos ?? [""]);
    setGoodDeed(entry.goodDeed ?? "");
    setLearning(entry.learning ?? "");
    setHighlights(entry.highlights ?? [""]);
  }, [entry.graditudes, entry.todos, entry.goodDeed, entry.learning, entry.highlights]);

  return (
    <KeyboardAvoidingView 
      behavior="padding"
      keyboardVerticalOffset={5}
      style={{width:'100%', flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={stylesJournal.containerCenter} >
        {(["", "grateful"].includes(activeSection)) && 
        <JournalSection
          title="grateful"
          description="What I am grateful for?"
          elements={graditudes}
          onChangeElements={setGraditudes}
          onFocusChange={(value: string) => setActiveSection(value)}
        /> }
        
        {(["", "todo"].includes(activeSection)) && 
        <JournalSection
          title="todo"
          description="What I want to do today?"
          elements={todos}
          onChangeElements={setTodos}
          onFocusChange={(value: string) => setActiveSection(value)}
          dynamic
        /> }

        {(["", "good"].includes(activeSection)) && 
        <JournalSection
          title="good"
          description="A good deed did I do today?"
          elements={[goodDeed]}
          onChangeElements={(next) => setGoodDeed(next[0])}
          onFocusChange={(value: string) => setActiveSection(value)}
          multiline
        /> }

        {(["", "learning"].includes(activeSection)) && 
        <JournalSection
          title="learning"
          description="What did I learn today?"
          elements={[learning]}
          onChangeElements={(next) => setLearning(next[0])}
          onFocusChange={(value: string) => setActiveSection(value)}
          multiline
        /> }

        {(["", "highlight"].includes(activeSection)) && 
        <JournalSection
          title="highlight"
          description="Today's highlights?"
          elements={highlights}
          onChangeElements={setHighlights}
          onFocusChange={(value: string) => setActiveSection(value)}
          dynamic
        /> }
      </ScrollView>
      <View
          style ={stylesJournal.itemJournal}>
          <Button
            title={activeSection=="" ? "Save" : "Close"}
            color={activeSection=="" ? "green" : "darkred"}
            onPress={() => {
              if (activeSection=="") {
                onChangeEntry?.({ graditudes, todos, goodDeed, learning, highlights });
              } else {
                setActiveSection("");
                Keyboard.dismiss();
              }
            }}
          />
        </View>
    </KeyboardAvoidingView>
  );
}