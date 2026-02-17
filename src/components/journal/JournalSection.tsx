import { ThemedTextInput } from "@/components/atomic/themed-input";
import { ThemedText } from "@/components/atomic/themed-text";
import { View } from "react-native";

type JournalSection = string[];

type JournalSectionProps = {
  title: string;
  elements: JournalSection;
  onChangeElements: (next: JournalSection) => void;
  dynamic?: boolean;
};

export default function Graditudes({
  title,
  elements: journalElements,
  onChangeElements,
  dynamic = false,
}: JournalSectionProps) {
  const elements = journalElements;

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
    <View>
      <ThemedText type="default">{title}</ThemedText>
      {elements.map((value, index) => (
        <ThemedTextInput
          key={index}
          placeholder={`#${index + 1}`}
          value={value}
          onChangeText={(value) => updateElement(index, value)}
        />
      ))}
    </View>
  );
}
