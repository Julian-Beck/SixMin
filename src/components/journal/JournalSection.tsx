import { ThemedTextInput } from "@/components/atomic/themed-input";
import { ThemedText } from "@/components/atomic/themed-text";
import stylesJournal from "@/style/journal";
import { useEffect, useRef, useState } from "react";
import { Keyboard, ScrollView, TextInput } from "react-native";

type JournalSection = string[];

type JournalSectionProps = {
  title: string,
  description: string;
  elements: JournalSection;
  onChangeElements: (next: JournalSection) => void;
  onFocusChange: (valueActive: string) => void;
  dynamic?: boolean;
  multiline?: boolean;
};

export default function Graditudes({
  title,
  description,
  elements: journalElements,
  onChangeElements,
  onFocusChange,
  dynamic = false,
  multiline = false,
}: JournalSectionProps) {
  const elements = journalElements;
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);
  
  const updateElement = (index: number, value: string) => {
    const next: JournalSection = [...elements] as JournalSection;
    next[index] = value;
    if (dynamic) {
      if (index === elements.length - 1 && value !== "") {
        next.push("");
      } else if (index < elements.length - 1 && value === "") {
        next.splice(index, 1);
      }
    }
    onChangeElements(next);
  };

  return (
    <ScrollView style={stylesJournal.itemJournal}>
      <ThemedText type="default">
        {description}
      </ThemedText>
      {elements.map((value, index) => (
        <ThemedTextInput
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          placeholder={`#${index + 1}`}
          value={value}
          onChangeText={(value) => updateElement(index, value)}
          onFocus={() => onFocusChange(title)}
          onBlur={() => onFocusChange("")}
          returnKeyType={index < elements.length - 1 || dynamic ? "next" : "done"}
          blurOnSubmit={index === elements.length - 1}
          onSubmitEditing={() => { inputRefs.current[index + 1]?.focus() }}
          
          style={{marginVertical: 5}}
          multiline={multiline}
          scrollEnabled={!multiline}
        />
      ))}
    </ScrollView>
  );
}
