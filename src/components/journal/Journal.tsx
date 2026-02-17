import JournalSection from "@/components/journal/JournalSection";
import { useEffect, useState } from "react";
import { Button, ScrollView } from "react-native";

export type JournalEntry = {
  graditudes: string[];
  todos: string[];
  goodDeed: string;
  highlights: string[];
};

type JournalProps = {
  entry: JournalEntry;
  onChangeEntry?: (entry: JournalEntry) => void;
};

export default function Journal({ entry, onChangeEntry }: JournalProps) {
  const [graditudes, setGraditudes] = useState<string[]>(entry.graditudes ?? ["", "", ""]);
  const [todos, setTodos] = useState<string[]>(entry.todos ?? [""]);
  const [goodDeed, setGoodDeed] = useState<string>(entry.goodDeed ?? "");
  const [highlights, setHighlights] = useState<string[]>(entry.highlights ?? [""]);

  // Keep local state in sync with prop changes
  useEffect(() => {
    setGraditudes(entry.graditudes ?? ["", "", ""]);
    setTodos(entry.todos ?? [""]);
    setGoodDeed(entry.goodDeed ?? "");
    setHighlights(entry.highlights ?? [""]);
  }, [entry.graditudes, entry.todos, entry.goodDeed, entry.highlights]);

  return (
    <ScrollView>
      <JournalSection
        title="What I am grateful for:"
        elements={graditudes}
        onChangeElements={setGraditudes}
      />
      <JournalSection
        title="What I want to do today:"
        elements={todos}
        onChangeElements={setTodos}
        dynamic
      />
      <JournalSection
        title="A good deed did I do today:"
        elements={[goodDeed]}
        onChangeElements={(next) => setGoodDeed(next[0])}
      />
      <JournalSection
        title="Today's highlights:"
        elements={highlights}
        onChangeElements={setHighlights}
        dynamic
      />

      <Button
        title="Save"
        onPress={() => {onChangeEntry?.({ graditudes, todos, goodDeed, highlights })
        }}
      />
    </ScrollView>
  );
}